interface Advertisting {
    "Інтернет": number;
    "Телебачення": number;
    "Радіо": number;
    "Транспорт": number;
    "Преса": number;
    "Зовнішні носії": number;
    "Промоушен": number;
}

class Result {
    budgets: Advertisting;
    budgetsSum: number;
    adEffect: Advertisting;
    adEffectSum: number;

    constructor (budgets, budgetsSum, adEffect, adEffectSum) {
        this.budgets = budgets;
        this.budgetsSum = budgetsSum;
        this.adEffect = adEffect;
        this.adEffectSum = adEffectSum;
    }

    toArray () {
        return [this.budgets, this.budgetsSum, this.adEffect, this.adEffectSum];
    }
}

$(function () {
    const segments: any = {
        minBudget: JSON.parse(localStorage.getItem("minBudget")),
        minPME: JSON.parse(localStorage.getItem("minPME")),
    };
    const adQuotient: Advertisting = {
        "Промоушен": 1.1506,
        "Радіо": 1.26627,
        "Зовнішні носії": 1.3808,
        "Преса": 1.5176,
        "Транспорт": 1.5176,
        "Інтернет": 1.4767,
        "Телебачення": 1.16465
    };

    // downloadData("list", "minBudget", "minPME", "adQuotient", "equipment");

    $("#selectSegment").on("change", () => {
        const budget = segments.minBudget[<any>$("#selectSegment").val()];

        if (budget === undefined) {
            <any>$("#marketing-button").hide("fast");
        } else {
            <any>$("#marketing-button").show("fast");
        }

        for (let adv in budget) {
            if (!budget.hasOwnProperty(adv) || adv == "Id" || adv == "Сегмент") continue;

            const inputElement: any = $(`[name='${adv}']`);
            inputElement[0].min = budget[adv];
            inputElement[0].value = "";
        }
    });

    $("#selectMode").on("change", (e: any) => {
        const select = $(".marketing-form input[type='number']");

        select.prop("disabled", true);
        select.val("");

        $(`.${e.target.value}`).removeAttr("disabled");
    });

    $("#marketing-button").on("click", (e: any) => {
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

            const formData: any = $(".marketing-form-item-budget.value");
            const adBudgets: any = {};
            let adEffects: any;

            for (let i = 0; i < formData.length; i++) {
                adBudgets[formData[i].name] = formData[i].value;
            }

            const result: Result = calcByAdBudgets($("#selectSegment").val() as any, adBudgets);

            (<any>$("#marketing-budget-sum")[0]).value = result.budgetsSum;
            ($("#marketing-effect-sum") as any)[0].value = result.adEffectSum;
            adEffects = result.adEffect;

            for (let ad in adEffects) {
                if (!adEffects.hasOwnProperty(ad)) continue;
                $(`.marketing-form-effect[name = "${ad}"]`).val(adEffects[ad]);
            }
        }

        function byMarketEffect() {
            const neededMarketingEffect: string = <any>$("#marketing-effect-sum").val();
            const selectedSegment: string = <any>$("#selectSegment").val();

            console.log(calcByMarketingEffect(parseFloat(selectedSegment), parseFloat(neededMarketingEffect)));
        }

        function byOveralBudget() {}
    });

    $("#advertising-form").on("input", (e:any) => {
        if (parseInt(e.target.value) < parseInt(e.target.min)) {
            e.target.classList.add("incorrect");
            $("#marketing-button").addClass("incorrect");
        } else {
            e.target.classList.remove("incorrect");
            $("#marketing-button").removeClass("incorrect");
        }
    }); //Check for minimal budget

    function calcByAdBudgets(segment: number, advertisingBudgets: any): any {
        let budgetSum = 0,
            effectSum = 0,
            adQ = 0;

        let adEffect: any = {};

        for (let ad in advertisingBudgets) {
            if (!advertisingBudgets.hasOwnProperty(ad) || advertisingBudgets[ad] == 0) continue;

            budgetSum += parseInt(advertisingBudgets[ad]);
            adEffect[ad] = calcAdMarketingEffect(segments.minBudget[segment][ad], segments.minPME[segment][ad], adQuotient[ad], advertisingBudgets[ad]);
            effectSum += adEffect[ad];
            adEffect[ad] = round(adEffect[ad], 5);

            adQ++;
        }

        switch (adQ) {
            case 2:
                effectSum += 0.00020
                break;
            case 3:
                effectSum += 0.00040;
                break;
            case 4:
                effectSum += 0.00070;
                break;
            case 5:
                effectSum += 0.001
                break;
            case 6:
                effectSum += 0.0013
                break;
            case 7:
                effectSum += 0.0017
        }

        effectSum = round(effectSum, 5);

        return new Result(advertisingBudgets, budgetSum, adEffect, effectSum);

        function round(number: number, digitsAfterDot: number): number {
            return Math.round(number*Math.pow(10, digitsAfterDot))/Math.pow(10, digitsAfterDot);
        }
    }

    function calcByMarketingEffect(segment: number, neededEffect: number) {
        const minBudget = segments.minBudget[segment];
        const minPME = segments.minPME[segment]; 

        let current = new Result(0, 0, 0, 0);

        let currentBudget: Advertisting = {
            "Інтернет": 0,
            "Телебачення": 0,
            "Радіо": 0,
            "Транспорт": 0,
            "Преса": 0,
            "Зовнішні носії": 0,
            "Промоушен": 0
        }
        
        while (neededEffect > current.adEffectSum) {
            const adMax = calcDerivative(minBudget, minPME, currentBudget) as any;
            
            if (currentBudget.hasOwnProperty(adMax)) {
                currentBudget[adMax] += (currentBudget[adMax] >= minBudget[adMax]) ? 1000 : minBudget[adMax];
            } else {
                console.error("Some shit happened")
            }

            current = calcByAdBudgets(segment, currentBudget);
        }

        return current;
    }

    function calcDerivative(minBudget: any, minPME: any, adBudgets: any): string {
        let maxDerivative = 0,
            maxDerivativeName;

        for (let ad in adBudgets) {
            if (!adBudgets.hasOwnProperty(ad)) continue;

            const priceDif = (adBudgets[ad] >= minBudget) ? 1000 : minBudget[ad];
            const effectDif = calcAdMarketingEffect(minBudget[ad], minPME[ad], adQuotient[ad], adBudgets[ad] + priceDif) - calcAdMarketingEffect(minBudget[ad], minPME[ad], adQuotient[ad], adBudgets[ad]);
            const derivative = effectDif/priceDif;

             if (derivative > maxDerivative) {
                 maxDerivative = derivative;
                 maxDerivativeName = ad;
             }
        }

        return maxDerivativeName;
    }

    function calcAdMarketingEffect(minBudget: number, minPME: number, adQuotient: number,  curBudget: number): number {

        return minPME * Math.pow(adQuotient,Math.log2(curBudget/minBudget));
    }

    function downloadData(...args: string[]) {
        $("#loader").toggleClass("hidden");
        $("#main").toggleClass("hidden");

        for (let i=0; i < arguments.length; i++) {
            const xhr = new XMLHttpRequest();
            const argument = arguments[i];

            xhr.open("get", `https://rubickwilde.api.stdlib.com/airtable-db-examples@dev/select/${argument}/icontains/?query=true`);
            xhr.send();

            xhr.onload = function() {
                let data = JSON.parse(xhr.response);

                if (data[0].hasOwnProperty('Id')) {
                    data = correctId(data);
                }

                localStorage.setItem(argument, JSON.stringify(data));

                if (i == arguments.length - 1) {
                    $("#loader").toggleClass("hidden");
                    $("#main").toggleClass("hidden");
                }

                function correctId(data: any): object[] {
                    let correctedId = new Array(13);

                    for (let i = 0; i < data.length; i++) {
                        correctedId[data[i].Id-1] = data[i];
                    }
                    return correctedId;
                }
            }
        }
    }
});



