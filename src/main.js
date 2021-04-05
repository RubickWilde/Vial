const adQuotient = {
    internet: 1.4767,
    television: 1.16465,
    radio: 1.26627,
    transport: 1.5176,
    press: 1.2695,
    externalDevices: 1.3808,
    promotion: 1.1506
};
const minAdBudget = {
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
    "Простокваша": {
        "internet": 13000,
        "television": 75000,
        "radio": 18000,
        "transport": 12000,
        "press": 9000,
        "externalDevices": 10000,
        "promotion": 3000
    },
    "Сметана": {
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
    "Творог": {
        "internet": 47000,
        "television": 210000,
        "radio": 52000,
        "transport": 39000,
        "press": 85000,
        "externalDevices": 18000,
        "promotion": 23000
    },
    "Мягкий сыр": {
        "internet": 49000,
        "television": 148000,
        "radio": 52000,
        "transport": 41000,
        "press": 73000,
        "externalDevices": 23000,
        "promotion": 19000
    },
    "Твердый сыр": {
        "internet": 42000,
        "television": 148000,
        "radio": 55000,
        "transport": 41000,
        "press": 70000,
        "externalDevices": 24000,
        "promotion": 26000
    },
    "Плавленный сыр": {
        "internet": 17000,
        "television": 96000,
        "radio": 11000,
        "transport": 14000,
        "press": 18000,
        "externalDevices": 27000,
        "promotion": 8000
    },
    "Згущенка": {
        "internet": 32000,
        "television": 156000,
        "radio": 23000,
        "transport": 46000,
        "press": 41000,
        "externalDevices": 31000,
        "promotion": 45000
    },
    "Масло": {
        "internet": 74000,
        "television": 195000,
        "radio": 100000,
        "transport": 64000,
        "press": 82000,
        "externalDevices": 52000,
        "promotion": 48000
    },
};
const basicMarketingEffect = {
    "Молоко Стерилізоване": {
        "internet": 0.000208,
        "television": 0.000011,
        "radio": 0.000026,
        "transport": 0.000274,
        "press": 0.000024,
        "externalDevices": 0.000095,
        "promotion": 0.000004
    },
    "Молоко Пастеризоване": {
        "internet": 0.000221,
        "television": 0.000011,
        "radio": 0.000027,
        "transport": 0.00025,
        "press": 0.000026,
        "externalDevices": 0.00009,
        "promotion": 0.000004
    },
    "Кефір": {
        "internet": 0.00025,
        "television": 0.00001,
        "radio": 0.00002,
        "transport": 0.00031,
        "press": 0.00002,
        "externalDevices": 0.0001,
        "promotion": 0
    },
    "Ряжанка": {
        "internet": 0.00025,
        "television": 0.00001,
        "radio": 0.00002,
        "transport": 0.00031,
        "press": 0.00002,
        "externalDevices": 0.0001,
        "promotion": 0
    },
    "Простокваша": {
        "internet": 0.000179,
        "television": 0.000009,
        "radio": 0.000025,
        "transport": 0.00025,
        "press": 0.000019,
        "externalDevices": 0.00006,
        "promotion": 0.000004
    },
    "Сметана": {
        "internet": 0.0003,
        "television": 0.00001,
        "radio": 0.00004,
        "transport": 0.00051,
        "press": 0.00004,
        "externalDevices": 0.00008,
        "promotion": 0
    },
    "Йогурт": {
        "internet": 0.0009,
        "television": 0.00001,
        "radio": 0.00007,
        "transport": 0.00194,
        "press": 0.00006,
        "externalDevices": 0.00023,
        "promotion": 0
    },
    "Творог": {
        "internet": 0.00037,
        "television": 0.00001,
        "radio": 0.00003,
        "transport": 0.00051,
        "press": 0.00004,
        "externalDevices": 0.00008,
        "promotion": 0
    },
    "Мягкий сыр": {
        "internet": 0.00038,
        "television": 0.00001,
        "radio": 0.00003,
        "transport": 0.00052,
        "press": 0.00004,
        "externalDevices": 0.00009,
        "promotion": 0
    },
    "Твердый сыр": {
        "internet": 0.00035,
        "television": 0.00001,
        "radio": 0.00003,
        "transport": 0.00052,
        "press": 0.00004,
        "externalDevices": 0.00009,
        "promotion": 0
    },
    "Плавленный сыр": {
        "internet": 0.00021,
        "television": 0.00001,
        "radio": 0.00002,
        "transport": 0.00027,
        "press": 0.00002,
        "externalDevices": 0.00009,
        "promotion": 0
    },
    "Згущенка": {
        "internet": 0.00045,
        "television": 0.00001,
        "radio": 0.00004,
        "transport": 0.0007,
        "press": 0.00004,
        "externalDevices": 0.00012,
        "promotion": 0
    },
    "Масло": {
        "internet": 0.00094,
        "television": 0.00002,
        "radio": 0.00004,
        "transport": 0.00789,
        "press": 0.00006,
        "externalDevices": 0.00039,
        "promotion": 0.00001
    }
};
class AdvertisingStrategy {
    constructor(segment, internet = 0, television = 0, radio = 0, transport = 0, press = 0, externalDevices = 0, promotion = 0) {
        this.segment = segment;
        this.advertismentTypes = {
            internet: internet,
            television: television,
            radio: radio,
            transport: transport,
            press: press,
            externalDevices: externalDevices,
            promotion: promotion
        };
    }
    calcMarketingEffect(adType) {
        let segment = this.segment;
        console.log(minAdBudget[segment] + " is segment" + segment);
        const budget = this.advertismentTypes[adType] / minAdBudget[segment][adType]; //Minimal budget times
        if (budget < 1) {
            alert(`Минимальный бюджет на ${adType} составляет ${minAdBudget[segment][adType]}. Реклама в этом сегменте будет снижена до 0`);
            return 0;
        }
        if (basicMarketingEffect[segment][adType] == null || basicMarketingEffect[segment][adType] == undefined) {
            alert("Для данного рынка не установлены коэфициенты");
        }
        return basicMarketingEffect[segment][adType] * Math.pow(adQuotient[adType], Math.log2(budget));
    }
    findDeriviatives() {
        const deriviatives = new Array(7);
        let i = 0, maxDeriviative = 0;
        const segment = this.segment;
        for (let adType in this.advertismentTypes) {
            if (deriviatives[i] == undefined) {
                deriviatives[i] = basicDeriviative(adType, segment); // Считаем базовую производную для каждого сегмента
            }
            else {
                //Посчитать производную для сегмента
            }
            if (deriviatives[i][0] > maxDeriviative) {
                console.log("is bigger");
                maxDeriviative = deriviatives[i][0];
            }
            i++;
        }
        function basicDeriviative(adType, segment) {
            return [minAdBudget[segment][adType] / basicMarketingEffect[segment][adType], minAdBudget[segment][adType]];
        }
    }
    calcDeriviative(adType) {
        const segment = this.segment, markEffect = basicMarketingEffect[segment][adType], // Базовый возможный рыночный эффект
        quotient = adQuotient[adType], // Коэфициент на данный вид рекламы
        budget = this.advertismentTypes[adType] / minAdBudget[segment][adType]; //Соотношение текущего и минимального бюджетов
        return (markEffect * Math.log(quotient) * Math.pow(quotient, Math.log(budget) / Math.log(2))) / (budget + Math.log(2));
    }
    calcSummaryMarketingEffect() {
        let sum = [];
        let result = 0;
        let i = 0;
        for (let type in this.advertismentTypes) {
            i++;
            const markEffect = this.calcMarketingEffect(type);
            if (markEffect == 0)
                i--;
            result += markEffect;
            sum.push(markEffect);
        }
        switch (i) {
            case 2:
                result += 0.00020;
                break;
            case 3:
                result += 0.00040;
                break;
            case 4:
                result += 0.00070;
                break;
            case 5:
                result += 0.001;
                break;
            case 6:
                result += 0.0013;
                break;
            case 7:
                result += 0.0017;
        }
        sum.push(result);
        return sum;
    }
    calcBudgetSum() {
        let sum = 0;
        for (let type in this.advertismentTypes) {
            if (typeof this.advertismentTypes[type] != "number")
                continue;
            sum += this.advertismentTypes[type];
        }
        return sum;
    }
}
// function findAdvertisingStrategy(segment:string):void {
//     const currentStrategy = new AdvertisingStrategy(segment);
//     let basicDeriviatives = [];
//     for (let type in currentStrategy.advertismentTypes) {
//         let deriviative:number = basicMarketingEffect[segment][type]/minAdBudget[segment][type];
//         console.log(`basicMarketingEffect[segment][type] is ${basicMarketingEffect[segment][type]}; minAdBudget is ${minAdBudget[segment][type]}; deriviative is ${deriviative}`)
//         basicDeriviatives.push(deriviative);
//     }
// }
// findAdvertisingStrategy("Молоко Стерилізоване");
// Добавить Event Listeners
window.onload = () => {
    const calculateButton = document.getElementById("calculate-button");
    const formLabel = document.getElementById("form-label");
    const marketingEffectInput = document.getElementById("input-possible-marketing-effect");
    const programModes = {
        marketingEffect: {
            node: document.getElementById("radio-possible-marketing-effect"),
            appearence() {
                marketingEffectInput.style.display = "block";
                calculateButton.classList.toggle("marketing");
                formLabel.style.display = "block";
                formLabel.innerText = "Рыночный эффект";
                programModes.advertisingBudget.formNode.style.display = "none";
                buttonEvent(() => {
                    return alert("Данная функция еще не доступна");
                });
            },
        },
        advertisingBudget: {
            node: document.getElementById("radio-advertising-budget"),
            formNode: document.getElementById("form-advertising"),
            resultNode: document.querySelectorAll(".window-main-right-advertising-table-cell.result"),
            appearence() {
                marketingEffectInput.style.display = "none";
                calculateButton.classList.toggle("marketing");
                formLabel.style.display = "none";
                programModes.advertisingBudget.formNode.style.display = "block";
                buttonEvent(segment => {
                    const adStrategy = new AdvertisingStrategy(segment);
                    const adInputs = document.getElementsByClassName("window-main-left-form-count-advertising-item-input");
                    let i = 0;
                    for (let adType in adStrategy.advertismentTypes) {
                        adStrategy.advertismentTypes[adType] = (adInputs[i++].value); //Записываем значение из инпутов в объект
                    }
                    let roundTo = 6;
                    let adResult = adStrategy.calcSummaryMarketingEffect();
                    for (let i = 0; i < programModes.advertisingBudget.resultNode.length; i++) {
                        let result = adResult[i].toString().slice(0, roundTo + 1);
                        programModes.advertisingBudget.resultNode[i].innerText = result;
                    }
                    adStrategy.findDeriviatives();
                });
            },
        },
    };
    programModes.marketingEffect.appearence(); // Начало прогаммы, запуск функции расчета рыночного эффекта
    for (let mode in programModes) {
        programModes[mode].node.addEventListener("change", programModes[mode].appearence);
    }
    function buttonEvent(mode) {
        calculateButton.onclick = () => {
            const selectedOptionValue = document.getElementById("segment-select").selectedOptions[0].value;
            mode(selectedOptionValue);
        };
        calculateButton.addEventListener("keydown", e => {
            if (e.code === "0x001C") {
                calculateButton.onclick;
            }
        });
    }
};
