class Result {
    constructor(budgets, budgetsSum, adEffect, adEffectSum) {
        this.budgets = budgets;
        this.budgetsSum = budgetsSum;
        this.adEffect = adEffect;
        this.adEffectSum = adEffectSum;
    }
    toArray() {
        return [this.budgets, this.budgetsSum, this.adEffect, this.adEffectSum];
    }
}
$(function () {
    const segments = {
        minBudget: JSON.parse(localStorage.getItem("minBudget")),
        minPME: JSON.parse(localStorage.getItem("minPME")),
    };
    const adQuotient = {
        "Промоушен": 1.1506,
        "Радіо": 1.26627,
        "Зовнішні носії": 1.3808,
        "Преса": 1.5176,
        "Транспорт": 1.5176,
        "Інтернет": 1.4767,
        "Телебачення": 1.16465
    };
    const selectSegment = $("#selectSegment"), selectMode = $("#selectMode"), marketingButton = $("#marketing-button"), advertisingForm = $("#advertising-form"), marketingBudgets = $(".by-marketing-budget"), marketingEffects = $(".marketing-form-effect"), marketingBudgetSum = $("#marketing-budget-sum"), marketingEffectSum = $("#marketing-effect-sum"), inputNumbers = $(".marketing-form input[type='number']");
    downloadData("list", "minBudget", "minPME", "adQuotient", "equipment");
    selectSegment.on("change", () => {
        const budget = segments.minBudget[parseInt(selectSegment.val())];
        inputNumbers.val("");
        if (budget === undefined) {
            $("#marketing-button").addClass("inactive");
        }
        else {
            $("#marketing-button").removeClass("inactive");
        }
        for (let adv in budget) {
            if (!budget.hasOwnProperty(adv) || adv == "Id" || adv == "Сегмент")
                continue;
            const inputElement = $(`[name='${adv}']`);
            inputElement[0].min = budget[adv];
            inputElement[0].value = "";
        }
    });
    selectMode.on("change", (e) => {
        inputNumbers.prop("disabled", true);
        inputNumbers.val("");
        $(`.${e.target.value}`).removeAttr("disabled");
    });
    marketingButton.on("click", (e) => {
        e.preventDefault();
        switch ($("#selectMode").val()) {
            case "by-marketing-budget":
                byAdBudget();
                break;
            case "by-marketing-effect":
                byMarketEffect();
                break;
            case "by-overall-budget":
                byOveralBudget();
                break;
            default:
                break;
        }
        function byAdBudget() {
            if (e.currentTarget.classList.contains("incorrect")) {
                alert("Рекламний бюджет не може бути нижчий за мінімальний");
                return;
            }
            const formData = $(".marketing-form-item-budget.value");
            const adBudgets = {};
            let adEffects;
            for (let i = 0; i < formData.length; i++) {
                adBudgets[formData[i].name] = formData[i].value;
            }
            const result = calcByAdBudgets($("#selectSegment").val(), adBudgets);
            displayResult(result);
        }
        function byMarketEffect() {
            const neededMarketingEffect = parseFloat(marketingEffectSum.val());
            const selectedSegment = parseFloat($("#selectSegment").val());
            loader();
            setTimeout(() => {
                displayResult(calcByMarketingEffect(selectedSegment, neededMarketingEffect));
            }, 50);
            setTimeout(() => { loader(); }, 51);
        }
        function byOveralBudget() {
            const neededOveralBudget = parseFloat(marketingBudgetSum.val());
            const selectedSegment = parseFloat($("#selectSegment").val());
            loader();
            setTimeout(() => {
                displayResult(calcByOveralBudget(selectedSegment, neededOveralBudget));
            }, 50);
            setTimeout(() => { loader(); }, 51);
        }
        function displayResult(result) {
            for (let ad of marketingEffects) {
                ad.value = result.adEffect[ad.name] || "0";
            }
            for (let ad of marketingBudgets) {
                ad.value = result.budgets[ad.name];
            }
            marketingBudgetSum.val(result.budgetsSum);
            marketingEffectSum.val(result.adEffectSum);
        }
    });
    advertisingForm.on("input", (e) => {
        if (parseInt(e.target.value) < parseInt(e.target.min)) {
            e.target.classList.add("incorrect");
            $("#marketing-button").addClass("incorrect");
        }
        else {
            e.target.classList.remove("incorrect");
            $("#marketing-button").removeClass("incorrect");
        }
    }); //Check for minimal budget
    function calcByAdBudgets(segment, advertisingBudgets) {
        let budgetSum = 0, effectSum = 0, adQ = 0;
        let adEffect = {};
        for (let ad in advertisingBudgets) {
            if (!advertisingBudgets.hasOwnProperty(ad) || advertisingBudgets[ad] == 0)
                continue;
            budgetSum += parseInt(advertisingBudgets[ad]);
            adEffect[ad] = calcAdMarketingEffect(segments.minBudget[segment][ad], segments.minPME[segment][ad], adQuotient[ad], advertisingBudgets[ad]);
            effectSum += adEffect[ad];
            adEffect[ad] = round(adEffect[ad], 5);
            adQ++;
        }
        switch (adQ) {
            case 2:
                effectSum += 0.00020;
                break;
            case 3:
                effectSum += 0.00040;
                break;
            case 4:
                effectSum += 0.00070;
                break;
            case 5:
                effectSum += 0.001;
                break;
            case 6:
                effectSum += 0.0013;
                break;
            case 7:
                effectSum += 0.0017;
        }
        effectSum = round(effectSum, 5);
        const result = new Result(advertisingBudgets, budgetSum, adEffect, effectSum);
        return result;
        function round(number, digitsAfterDot) {
            return Math.round(number * Math.pow(10, digitsAfterDot)) / Math.pow(10, digitsAfterDot);
        }
    }
    function calcByMarketingEffect(segment, neededEffect) {
        const minBudget = segments.minBudget[segment];
        const minPME = segments.minPME[segment];
        let current = new Result(0, 0, 0, 0);
        let currentBudget = {
            "Інтернет": 0,
            "Телебачення": 0,
            "Радіо": 0,
            "Транспорт": 0,
            "Преса": 0,
            "Зовнішні носії": 0,
            "Промоушен": 0
        };
        let i = 0;
        while (neededEffect > current.adEffectSum) {
            const adMax = calcDerivative(minBudget, minPME, currentBudget, segment);
            if (currentBudget.hasOwnProperty(adMax)) {
                currentBudget[adMax] += (currentBudget[adMax] >= minBudget[adMax]) ? 1000 : minBudget[adMax];
            }
            else {
                console.error("Some shit happened");
            }
            current = calcByAdBudgets(segment, currentBudget);
            if (i == 80000) {
                alert("Ваша цифра занадто велика. Не можу її порахувати(");
                return null;
            }
            i++;
        }
        return current;
    }
    function calcByOveralBudget(segment, neededBudget) {
        const minBudget = segments.minBudget[segment];
        const minPME = segments.minPME[segment];
        let current = new Result(0, 0, 0, 0);
        let currentBudget = {
            "Інтернет": 0,
            "Телебачення": 0,
            "Радіо": 0,
            "Транспорт": 0,
            "Преса": 0,
            "Зовнішні носії": 0,
            "Промоушен": 0
        };
        let i = 0;
        while (neededBudget > current.budgetsSum) {
            const adMax = calcDerivative(minBudget, minPME, currentBudget, segment);
            if (currentBudget.hasOwnProperty(adMax)) {
                currentBudget[adMax] += (currentBudget[adMax] >= minBudget[adMax]) ? 1000 : minBudget[adMax];
            }
            else {
                console.error("Some shit happened");
            }
            current = calcByAdBudgets(segment, currentBudget);
            if (i == 80000) {
                alert("Ваша цифра занадто велика. Не можу її порахувати(");
                return null;
            }
            i++;
        }
        return current;
    }
    function calcDerivative(minBudget, minPME, adBudgets, segment) {
        let maxDerivative = 0, maxDerivativeName;
        for (let ad in adBudgets) {
            if (!adBudgets.hasOwnProperty(ad))
                continue;
            const priceDif = (adBudgets[ad] >= minBudget) ? 1000 : minBudget[ad];
            const possibleAdBudget = Object.assign({}, adBudgets);
            possibleAdBudget[ad] += priceDif;
            const effectDif = calcByAdBudgets(segment, possibleAdBudget).adEffectSum - calcByAdBudgets(segment, adBudgets).adEffectSum;
            const derivative = effectDif / priceDif;
            if (derivative > maxDerivative) {
                maxDerivative = derivative;
                maxDerivativeName = ad;
            }
        }
        return maxDerivativeName;
    }
    function calcAdMarketingEffect(minBudget, minPME, adQuotient, curBudget) {
        return minPME * Math.pow(adQuotient, Math.log2(curBudget / minBudget));
    }
    function downloadData(...args) {
        loader();
        for (let i = 0; i < arguments.length; i++) {
            const xhr = new XMLHttpRequest();
            const argument = arguments[i];
            xhr.open("get", `https://rubickwilde.api.stdlib.com/airtable-db-examples@dev/select/${argument}/icontains/?query=true`);
            xhr.send();
            xhr.onload = function () {
                let data = JSON.parse(xhr.response);
                if (data[0].hasOwnProperty('Id')) {
                    data = correctId(data);
                }
                localStorage.setItem(argument, JSON.stringify(data));
                if (i == arguments.length - 1)
                    loader();
                function correctId(data) {
                    let correctedId = new Array(13);
                    for (let i = 0; i < data.length; i++) {
                        correctedId[data[i].Id - 1] = data[i];
                    }
                    return correctedId;
                }
            };
        }
    }
    function loader() {
        $("#loader").toggleClass("hidden");
        $("#main").toggleClass("hidden");
    }
});
