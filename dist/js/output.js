var adQuotient = {
    internet: 1.4767,
    television: 1.16465,
    radio: 1.26627,
    transport: 1.5176,
    press: 1.2695,
    externalDevices: 1.3808,
    promotion: 1.1506
};
var minAdBudget = {
    "Молоко Стерилізоване": {
        "internet": 17000,
        "television": 128000,
        "radio": 21000,
        "transport": 14000,
        "press": 18000,
        "externalDevices": 27000,
        "promotion": 8000
    },
    "Молоко Пастеризоване": {
        "internet": 19000,
        "television": 115000,
        "radio": 23000,
        "transport": 12000,
        "press": 23000,
        "externalDevices": 24000,
        "promotion": 11000
    },
    "Кефір": {
        "internet": 23000,
        "television": 132000,
        "radio": 26000,
        "transport": 17000,
        "press": 21000,
        "externalDevices": 28000,
        "promotion": 13000
    },
    "Ряжанка": {
        "internet": 23000,
        "television": 132000,
        "radio": 26000,
        "transport": 17000,
        "press": 21000,
        "externalDevices": 28000,
        "promotion": 13000
    },
    "Кисляк (простокваша)": {
        "internet": 13000,
        "television": 75000,
        "radio": 18000,
        "transport": 12000,
        "press": 9000,
        "externalDevices": 10000,
        "promotion": 3000
    },
    "Cметана": {
        "internet": 32000,
        "television": 340000,
        "radio": 70000,
        "transport": 39000,
        "press": 85000,
        "externalDevices": 18000,
        "promotion": 14000
    },
    "Йогурт": {
        "internet": 230000,
        "television": 730000,
        "radio": 480000,
        "transport": 360000,
        "press": 280000,
        "externalDevices": 180000,
        "promotion": 165000
    },
    "Сирна (творожна) продукція": {
        "internet": 47000,
        "television": 210000,
        "radio": 52000,
        "transport": 39000,
        "press": 85000,
        "externalDevices": 18000,
        "promotion": 23000
    },
    "М'який сир": {
        "internet": 49000,
        "television": 148000,
        "radio": 52000,
        "transport": 41000,
        "press": 73000,
        "externalDevices": 23000,
        "promotion": 19000
    },
    "Твердий сир": {
        "internet": 42000,
        "television": 148000,
        "radio": 55000,
        "transport": 41000,
        "press": 70000,
        "externalDevices": 24000,
        "promotion": 26000
    },
    "Плавленний сир": {
        "internet": 17000,
        "television": 96000,
        "radio": 11000,
        "transport": 14000,
        "press": 18000,
        "externalDevices": 27000,
        "promotion": 8000
    },
    "Згущеное молоко": {
        "internet": 32000,
        "television": 156000,
        "radio": 23000,
        "transport": 46000,
        "press": 41000,
        "externalDevices": 31000,
        "promotion": 45000
    },
    "Вершкове масло": {
        "internet": 74000,
        "television": 195000,
        "radio": 100000,
        "transport": 64000,
        "press": 82000,
        "externalDevices": 52000,
        "promotion": 48000
    }
};
var basicMarketingEffect = {
    "Молоко Стерилізоване": {
        internet: 0.000208,
        television: 0.000011,
        radio: 0.000026,
        transport: 0.000274,
        press: 0.000024,
        externalDevices: 0.000095,
        promotion: 0.000004
    },
    "Молоко Пастеризоване": {
        internet: 0.000221,
        television: 0.000011,
        radio: 0.000027,
        transport: 0.000250,
        press: 0.000026,
        externalDevices: 0.000090,
        promotion: 0.000004
    },
    "Кефір": {},
    "Ряжанка": { //У кефира и ряжанкки одинаковая реклама
    },
    "Кисляк (простокваша)": {
        internet: 0.000179,
        television: 0.000009,
        radio: 0.000025,
        transport: 0.000250,
        press: 0.000019,
        externalDevices: 0.000060,
        promotion: 0.000004
    },
    "Cметана": {},
    "Йогурт": { //У кефира и ряжка одинаковая реклама
    },
    "Сирна (творожна) продукція": {},
    "М'який сир": {},
    "Твердий сир": {},
    "Плавленний сир": {},
    "Згущеное молоко": {},
    "Вершкове масло": {}
};
var AdvertisingStrategy = /** @class */ (function () {
    function AdvertisingStrategy(segment, internet, television, radio, transport, press, externalDevices, promotion) {
        if (internet === void 0) { internet = 0; }
        if (television === void 0) { television = 0; }
        if (radio === void 0) { radio = 0; }
        if (transport === void 0) { transport = 0; }
        if (press === void 0) { press = 0; }
        if (externalDevices === void 0) { externalDevices = 0; }
        if (promotion === void 0) { promotion = 0; }
        this.segment = segment;
        this.advertismentType = {
            internet: internet,
            television: television,
            radio: radio,
            transport: transport,
            press: press,
            externalDevices: externalDevices,
            promotion: promotion
        };
    }
    AdvertisingStrategy.prototype.calcMarketingEffect = function (adType) {
        var segment = this.segment;
        var budget = this.advertismentType[adType] / minAdBudget[segment][adType]; //Minimal budget times
        if (budget < 1) {
            alert("\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442 \u043D\u0430 " + adType + " \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 " + minAdBudget[segment][adType] + ". \u0420\u0435\u043A\u043B\u0430\u043C\u0430 \u0432 \u044D\u0442\u043E\u043C \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0435 \u0431\u0443\u0434\u0435\u0442 \u0441\u043D\u0438\u0436\u0435\u043D\u0430 \u0434\u043E 0");
            return 0;
        }
        return basicMarketingEffect[segment][adType] * Math.pow(adQuotient[adType], Math.log2(budget));
    };
    AdvertisingStrategy.prototype.calcDeriviative = function (adType) {
        var segment = this.segment, markEffect = basicMarketingEffect[segment][adType], quotient = adQuotient[adType], budget = this.advertismentType[adType] / minAdBudget[segment][adType]; //Minimal budget times
        return (markEffect * Math.log(quotient) * Math.pow(quotient, Math.log(budget) / Math.log(2))) / (budget + Math.log(2));
    };
    AdvertisingStrategy.prototype.calcSummaryMarketingEffect = function () {
        var sum = 0;
        var i = 0;
        for (var type in this.advertismentType) {
            i++;
            var markEffect = this.calcMarketingEffect(type);
            if (markEffect == 0)
                i--;
            sum += markEffect;
        }
        switch (i) {
            case 2:
                sum += 0.00020;
                break;
            case 3:
                sum += 0.00040;
                break;
            case 4:
                sum += 0.00070;
                break;
            case 5:
                sum += 0.001;
                break;
            case 6:
                sum += 0.0013;
                break;
            case 7:
                sum += 0.0017;
        }
        return sum;
    };
    AdvertisingStrategy.prototype.calcBudgetSum = function () {
        var sum = 0;
        for (var type in this.advertismentType) {
            if (typeof this.advertismentType[type] != "number")
                continue;
            sum += this.advertismentType[type];
        }
        return sum;
    };
    return AdvertisingStrategy;
}());
function findAdvertisingStrategy(segment) {
    var currentStrategy = new AdvertisingStrategy(segment);
    var basicDeriviatives = [];
    for (var type in currentStrategy.advertismentType) {
        var deriviative = basicMarketingEffect[segment][type] / minAdBudget[segment][type];
        console.log("basicMarketingEffect[segment][type] is " + basicMarketingEffect[segment][type] + "; minAdBudget is " + minAdBudget[segment][type] + "; deriviative is " + deriviative);
        basicDeriviatives.push(deriviative);
    }
}
// const maxAdvertisingBudget = new AdvertisingStrategy("Молоко Стерилізоване",17000, 128000, 21000, 14000, 18000, 27000, 8000);
// console.log(maxAdvertisingBudget.calcSummaryMarketingEffect());
findAdvertisingStrategy("Молоко Стерилізоване");
// Добавить Event Listeners
window.onload = function () {
    var calculateButton = document.getElementById("calculate-button");
    var formLabel = document.getElementById("form-label");
    var marketingEffectInput = document.getElementById("input-possible-marketing-effect");
    var formAdvertising = document.getElementById("form-advertising");
    var programModes = {
        marketingEffect: {
            node: document.getElementById("radio-possible-marketing-effect"),
            appearence: function () {
                marketingEffectInput.style.display = "block";
                calculateButton.classList.toggle("marketing");
                formLabel.style.display = "block";
                formLabel.innerText = "Рыночный эффект";
                formAdvertising.style.display = "none";
                buttonEvent(function () {
                    return alert("Данная функция еще не доступна");
                });
            }
        },
        advertisingBudget: {
            node: document.getElementById("radio-advertising-budget"),
            appearence: function () {
                marketingEffectInput.style.display = "none";
                calculateButton.classList.toggle("marketing");
                formLabel.style.display = "none";
                formAdvertising.style.display = "block";
                buttonEvent(function (segment) {
                    var adStrategy = new AdvertisingStrategy(segment);
                    var adInputs = document.getElementsByClassName("window-main-left-form-count-advertising-item-input");
                    var i = 0;
                    for (var adType in adStrategy.advertismentType) {
                        adStrategy.advertismentType[adType] = adInputs[i++].value;
                    }
                    console.log(adStrategy.calcSummaryMarketingEffect());
                });
            }
        }
    };
    programModes.marketingEffect.appearence(); // Начало прогаммы, запуск функции расчета рыночного эффекта
    for (var mode in programModes) {
        programModes[mode].node.addEventListener("change", programModes[mode].appearence);
    }
    function buttonEvent(mode) {
        calculateButton.onclick = function () {
            var selectedOptionValue = document.getElementById("segment-select").selectedOptions[0].value;
            mode(selectedOptionValue);
        };
        calculateButton.addEventListener("keydown", function (e) {
            if (e.code === "0x001C") {
                calculateButton.onclick;
            }
        });
    }
};
