interface AdvertisingStrategy {
    segment: string;
    advertismentType: any;
}

const adQuotient = {
    internet: 1.4767,
    television: 1.16465,
    radio: 1.26627,
    transport: 1.5176,
    press: 1.2695,
    externalDevices: 1.3808,
    promotion: 1.1506
}

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
    "Ряжанка": { //У кефира и ряжанкки одинаковая реклама
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
    "Йогурт": { //У кефира и ряжка одинаковая реклама
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
    },
}

const basicMarketingEffect = {
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
    "Кефір": {
       
    },
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
    "Cметана": {
       
    },
    "Йогурт": { //У кефира и ряжка одинаковая реклама
       
    },
    "Сирна (творожна) продукція": {
       
    },
    "М'який сир": {
        
    },
    "Твердий сир": {
        
    },
    "Плавленний сир": {
       
    },
    "Згущеное молоко": {
        
    },
    "Вершкове масло": {
      
    },
}

class AdvertisingStrategy {
    constructor(segment:string,internet = 0, television = 0, radio = 0, transport = 0, press = 0, externalDevices = 0, promotion = 0) {
        this.segment = segment;
        this.advertismentType = {
            internet: internet,
            television: television,
            radio: radio,
            transport: transport,
            press: press,
            externalDevices: externalDevices,
            promotion: promotion
        }
    }

    calcMarketingEffect(adType:any):any {
        let segment:any = this.segment;

        const budget:any = this.advertismentType[adType]/minAdBudget[segment][adType]; //Minimal budget times

        if (budget < 1) {
            alert(`Минимальный бюджет на ${adType} составляет ${minAdBudget[segment][adType]}. Реклама в этом сегменте будет снижена до 0`);
            return 0;
        }

        return basicMarketingEffect[segment][adType] * Math.pow(adQuotient[adType],Math.log2(budget));
    }

    calcDeriviative(adType:string):number {
        const segment = this.segment,
              markEffect = basicMarketingEffect[segment][adType],
              quotient = adQuotient[adType],
              budget = this.advertismentType[adType]/minAdBudget[segment][adType]; //Minimal budget times
              

        return (markEffect * Math.log(quotient) * Math.pow(quotient, Math.log(budget)/Math.log(2)))/(budget+Math.log(2));
    }

    calcSummaryMarketingEffect():number {
        let sum:any = 0;
        let i = 0;
        
        for (let type in this.advertismentType) {
            i++;
            const markEffect = this.calcMarketingEffect(type);
            if (markEffect == 0) i--;
            sum += markEffect; 
        }

        switch (i) {
            case 2:
                sum += 0.00020 
                break;
            case 3:
                sum += 0.00040;
                break;
            case 4:
                sum += 0.00070;
                break;
            case 5:
                sum += 0.001
                break;
            case 6:
                sum += 0.0013
                break;
            case 7: 
                sum += 0.0017
        }

        return sum;
    }


    calcBudgetSum():number {
        let sum:any = 0;

        for (let type in this.advertismentType) {
            if (typeof this.advertismentType[type] != "number") continue;
            sum += this.advertismentType[type]; 
        }

        return sum;
    }
}

function findAdvertisingStrategy(segment:string):void {
    const currentStrategy = new AdvertisingStrategy(segment);

    let basicDeriviatives = [];
    
    for (let type in currentStrategy.advertismentType) {
        let deriviative:number = basicMarketingEffect[segment][type]/minAdBudget[segment][type];
        console.log(`basicMarketingEffect[segment][type] is ${basicMarketingEffect[segment][type]}; minAdBudget is ${minAdBudget[segment][type]}; deriviative is ${deriviative}`)
        basicDeriviatives.push(deriviative);
    }

}

// const maxAdvertisingBudget = new AdvertisingStrategy("Молоко Стерилізоване",17000, 128000, 21000, 14000, 18000, 27000, 8000);

// console.log(maxAdvertisingBudget.calcSummaryMarketingEffect());

findAdvertisingStrategy("Молоко Стерилізоване");


// Добавить Event Listeners

window.onload = () => {
    const calculateButton = document.getElementById("calculate-button");
    const formLabel = document.getElementById("form-label");
    const marketingEffectInput = document.getElementById("input-possible-marketing-effect");
    const formAdvertising = document.getElementById("form-advertising");

    const programModes:any = {
        marketingEffect: {
            node: document.getElementById("radio-possible-marketing-effect"),
            appearence() {
                marketingEffectInput.style.display = "block";
                calculateButton.classList.toggle("marketing")
                formLabel.style.display = "block";
                formLabel.innerText = "Рыночный эффект";
                formAdvertising.style.display = "none";

                buttonEvent(() => {
                    return alert("Данная функция еще не доступна");
                });
            },
        },
        advertisingBudget: {
            node: document.getElementById("radio-advertising-budget"),
            appearence() {
                marketingEffectInput.style.display = "none";
                calculateButton.classList.toggle("marketing");
                formLabel.style.display = "none";
                formAdvertising.style.display = "block";

                buttonEvent(segment  => { // Считаем возможный рыночный эффект от заданного пользователем рекламного бюджета
                    const adStrategy = new AdvertisingStrategy(segment);
                    const adInputs:any = document.getElementsByClassName("window-main-left-form-count-advertising-item-input");

                    let i = 0;
                    for (let adType in adStrategy.advertismentType) {
                        adStrategy.advertismentType[adType] = adInputs[i++].value;
                    }

                    console.log(adStrategy.calcSummaryMarketingEffect());
                });
            },
        },
    }

    programModes.marketingEffect.appearence(); // Начало прогаммы, запуск функции расчета рыночного эффекта

    for (let mode in programModes) {
        programModes[mode].node.addEventListener("change", programModes[mode].appearence);
    }

   function buttonEvent(mode) {
        calculateButton.onclick = () => {
                    const selectedOptionValue:string = (document.getElementById("segment-select") as HTMLSelectElement).selectedOptions[0].value;        
                    mode(selectedOptionValue);
                }

        calculateButton.addEventListener("keydown", e => {
            if (e.code === "0x001C") {
                calculateButton.onclick;
            }
        })
   }

}

