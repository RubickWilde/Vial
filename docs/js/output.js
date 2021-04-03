$(function () {
    var segments = {
        minBudget: JSON.parse(localStorage.getItem("minBudget")),
        minPME: JSON.parse(localStorage.getItem("minPME"))
    };
    var adQuotient = {
        "Промоушен": 1.1506,
        "Радіо": 1.26627,
        "Зовнішні носії": 1.3808,
        "Преса": 1.5176,
        "Транспорт": 1.5176,
        "Інтернет": 1.4767,
        "Телебачення": 1.16465
    };
    // downloadData("list", "minBudget", "minPME", "adQuotient", "equipment");
    $("#selectSegment").on("change", function () {
        var budget = segments.minBudget[$("#selectSegment").val()];
        if (budget === undefined) {
            $("#marketing-button").hide("fast");
        }
        else {
            $("#marketing-button").show("fast");
        }
        for (var adv in budget) {
            if (!budget.hasOwnProperty(adv) || adv == "Id" || adv == "Сегмент")
                continue;
            var inputElement = $("[name='" + adv + "']");
            inputElement[0].min = budget[adv];
            inputElement[0].value = "";
        }
    });
    $("#selectMode").on("change", function (e) {
        var select = $(".marketing-form input[type='number']");
        select.prop("disabled", true);
        select.val("");
        $("." + e.target.value).removeAttr("disabled");
    });
    $("#marketing-button").on("click", function (e) {
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
            var _a;
            if (e.currentTarget.classList.contains("incorrect")) {
                alert("Рекламний бюджет не може бути нижчий за мінімальний");
                return;
            }
            var formData = $(".marketing-form-item-budget.value");
            var adBudgets = {};
            var adEffects;
            for (var i = 0; i < formData.length; i++) {
                adBudgets[formData[i].name] = formData[i].value;
            }
            _a = calcByAdBudgets($("#selectSegment").val(), adBudgets), $("#marketing-budget-sum")[0].value = _a[0], $("#marketing-effect-sum")[0].value = _a[1], adEffects = _a[2];
            for (var ad in adEffects) {
                if (!adEffects.hasOwnProperty(ad))
                    continue;
                $("[data-name = \"" + ad + "\"]").html(adEffects[ad]);
            }
        }
        function byMarketEffect() {
            var neededMarketingEffect = $("#marketing-effect-sum").val();
            var selectedSegment = $("#selectSegment").val();
            calcByMarketingEffect(parseFloat(selectedSegment), parseFloat(neededMarketingEffect));
        }
        function byOveralBudget() { }
    });
    $("#advertising-form").on("input", function (e) {
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
        var budgetSum = 0, effectSum = 0, adQ = 0;
        var adEffect = {};
        for (var ad in advertisingBudgets) {
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
        return [budgetSum, effectSum, adEffect];
        function round(number, digitsAfterDot) {
            return Math.round(number * Math.pow(10, digitsAfterDot)) / Math.pow(10, digitsAfterDot);
        }
    }
    function calcByMarketingEffect(segment, neededEffect) {
        var minBudget = segments.minBudget[segment];
        var minPME = segments.minPME[segment];
        var currentEffect = [, 0,];
        var currentBudget = {
            "Інтернет": 0,
            "Телебачення": 0,
            "Радіо": 0,
            "Транспорт": 0,
            "Преса": 0,
            "Зовнішні носії": 0,
            "Промоушен": 0
        };
        console.log(currentBudget);
        while (neededEffect > currentEffect[1]) {
            var adMax = calcDerivative(minBudget, minPME, currentBudget);
            // console.log(`adMax is ${adMax}`);
            // if (currentBudget.hasOwnProperty(adMax)) {
            //     currentBudget[adMax] += (currentBudget[adMax] > minBudget[adMax]) ? 1000 : minBudget[adMax];
            // } else {
            //     console.error("Some shit happened")
            // }
            // console.log(`currentBudget is ${currentBudget}`)
            currentEffect = calcByAdBudgets(segment, currentBudget);
        }
    }
    function calcDerivative(minBudget, minPME, adBudgets) {
        var maxDerivative = 0, maxDerivativeName;
        console.log(adBudgets);
        for (var ad in adBudgets) {
            if (!adBudgets.hasOwnProperty(ad))
                continue;
            var priceDif = (adBudgets[ad] >= minBudget) ? 1000 : minBudget[ad];
            var effectDif = calcAdMarketingEffect(minBudget[ad], minPME[ad], adQuotient[ad], adBudgets[ad] + priceDif) - calcAdMarketingEffect(minBudget[ad], minPME[ad], adQuotient[ad], adBudgets[ad]);
            var derivative = effectDif / priceDif;
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
    function downloadData() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        $("#loader").toggleClass("hidden");
        $("#main").toggleClass("hidden");
        var _loop_1 = function (i) {
            var xhr = new XMLHttpRequest();
            var argument = arguments_1[i];
            xhr.open("get", "https://rubickwilde.api.stdlib.com/airtable-db-examples@dev/select/" + argument + "/icontains/?query=true");
            xhr.send();
            xhr.onload = function () {
                var data = JSON.parse(xhr.response);
                if (data[0].hasOwnProperty('Id')) {
                    data = correctId(data);
                }
                localStorage.setItem(argument, JSON.stringify(data));
                if (i == arguments.length - 1) {
                    $("#loader").toggleClass("hidden");
                    $("#main").toggleClass("hidden");
                }
                function correctId(data) {
                    var correctedId = new Array(13);
                    for (var i_1 = 0; i_1 < data.length; i_1++) {
                        correctedId[data[i_1].Id - 1] = data[i_1];
                    }
                    return correctedId;
                }
            };
        };
        var arguments_1 = arguments;
        for (var i = 0; i < arguments.length; i++) {
            _loop_1(i);
        }
    }
});
