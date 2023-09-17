import Png from "../Img/tabl.png"
import {useEffect, useState} from "react";

type CommandType = "Organic" | "Embedded" | "Semidetach";
export const MenuPage = () => {

    const [typeCommand, setTypeCommand] = useState<CommandType>("Organic")

    const [RELY, setRELY] = useState(1)
    const [DATA, setDATA] = useState(1)
    const [CPLX, setCPLX] = useState(1)
    const [TIME, setTIME] = useState(1)
    const [STOR, setSTOR] = useState(1)
    const [VIRT, setVIRT] = useState(1)
    const [TURN, setTURN] = useState(1)
    const [ACAP, setACAP] = useState(1)
    const [AEXP, setAEXP] = useState(1)
    const [PCAP, setPCAP] = useState(1)
    const [VEXP, setVEXP] = useState(1)
    const [LEXP, setLEXP] = useState(1)
    const [MODP, setMODP] = useState(1)
    const [TOOL, setTOOL] = useState(1)
    const [SCED, setSCED] = useState(1)

    const [PM, setPM] = useState(0)
    const [TM, setTM] = useState(0)
    const [SS, setSS] = useState(0)
    const [PMEAF, setPMEAF] = useState(0)
    const [SIZE, setSIZE] = useState(0)

    function EAFCheck() {

        let a = 0
        let b = 0
        let c = 2.5
        let d = 0

        if(typeCommand === "Organic"){
            a = 2.4
            b = 1.05
            d = 0.38
        }else if(typeCommand === "Semidetach"){
            a = 3
            b = 1.12
            d = 0.35
        }else{
            a = 3.6
            b = 1.2
            d = 0.32
        }

        const eaf = RELY * DATA * CPLX * TIME * STOR * VIRT * TURN * ACAP * AEXP * PCAP * VEXP * LEXP *
            MODP * TOOL * SCED

        const PMCheck = a * Math.pow(SIZE, b)
        const TMCheck = c *  Math.pow(PMCheck, d)
        const SSCheck = PMCheck / TMCheck
        const PMEAF = eaf * a *  Math.pow(SIZE, b)

        setPM(+PMCheck.toFixed(2))
        setTM(+TMCheck.toFixed(2))
        setSS(+SSCheck.toFixed(2))
        setPMEAF(+PMEAF.toFixed(2))

    }

    useEffect(() => {
        EAFCheck()
    }, [RELY, DATA, CPLX, TIME, STOR, VIRT, TURN, ACAP, AEXP, PCAP, VEXP, LEXP,
        MODP, TOOL, SCED, SIZE, typeCommand])


    function createCell(name: string, value: any, id: string, setUseState: (value: any) => void, className?: string) {

        if (!className) {
            className = "border border-2 p-2 h-16 grid"
        }

        return (
            <div className={className}>
                <input
                    name={name}
                    value={value}
                    type="radio"
                    id={id}
                    onChange={e => setUseState(value)}/>
                <label htmlFor={id}>{value}</label>
            </div>
        )
    }

    function createPText(name: string) {
        return (
            <p className="border border-2 p-2 h-16 text-center">{name}</p>
        )
    }

    return (
        <div>
            <header className="text-2xl text-center p-4">
                COCOMO calculator
            </header>

            <div className="p-4">

                <div className="flex px-2 gap-2">
                    <p>Кількість рядків(тисяч) які потрібно написати</p>
                    <input placeholder="0"
                           type={"number"}
                           value={SIZE}
                           className="rounded-md text-center border border-2"
                           onChange={e => setSIZE(+e.target.value)}/>
                </div>

                <div className="p-2 gap-2 flex">
                    <p>Тип команди:</p>
                    {createCell("team", "Organic", "organic", setTypeCommand, "1")}
                    {createCell("team", "Semidetach", "semidetach", setTypeCommand, "1")}
                    {createCell("team", "Embedded", "embedded", setTypeCommand, "1")}
                </div>

                <div className="p-8 grid grid-cols-2 text-center gap-2">
                    <p>{PM} людино-місяців</p>
                    <p>{TM} Місяців</p>
                    <p>{SS} Персоналу</p>
                    <p>{PMEAF} Трудоємність людино-місяців</p>
                </div>

                <div className="grid grid-cols-7">

                    <div className="">
                        {createPText("Тип / важкість")}
                        {createPText("Необхідна надійність ПЗ")}
                        {createPText("Розмір БД програми")}
                        {createPText("Складність продукту")}
                        {createPText("Вимоги до швидкодії")}
                        {createPText("Обмеження пам'яті")}
                        {createPText("Нестійкість оточення")}
                        {createPText("Час відновлення")}
                        {createPText("Аналітичні здібності")}
                        {createPText("Здібності до розробки ПЗ")}
                        {createPText("Досвід розробки")}
                        {createPText("Досвід використання віртуальних машин")}
                        {createPText("Досвід мови")}
                        {createPText("Інструменти розробки")}
                        {createPText("Методи розробки")}
                        {createPText("Графік розробки")}
                    </div>

                    <div className="text-center">
                        {createPText("Дуже низький")}

                        {createCell("Reliability of the software is necessary", "0.75", "reliabilityOfTheSoftwareIsNecessary", setRELY)}

                        {createCell("The size of the program database", "-", "theSizeOfTheProgramDatabase", setDATA)}

                        {createCell("Product complexity", "0.7", "productComplexity", setCPLX)}

                        {createCell("Requirements for speed", "-", "requirementsForSpeed", setTIME)}

                        {createCell("Memory limitations", "-", "memoryLimitations", setSTOR)}

                        {createCell("The instability of the environment", "-", "theInstabilityOfTheEnvironment", setVIRT)}

                        {createCell("Recovery time", "-", "recoveryTime", setTURN)}

                        {createCell("Analytical abilities", "1.46", "analyticalAbilities", setACAP)}

                        {createCell("Software development skills", "1.29", "softwareDevelopmentSkills", setAEXP)}

                        {createCell("Development experience", "1.42", "developmentExperience", setPCAP)}

                        {createCell("Experience using virtual machines", "1.21", "experienceUsingVirtualMachines", setVEXP)}

                        {createCell("Language experience", "1.14", "languageExperience", setLEXP)}

                        {createCell("Development tools", "1.24", "developmentTools", setMODP)}

                        {createCell("Development methods", "1.24", "developmentMethods", setTOOL)}

                        {createCell("Development schedule", "1.23", "developmentSchedule", setSCED)}

                    </div>

                    <div className="text-center">
                        {createPText("Низький")}

                        {createCell("Reliability of the software is necessary", "0.88", "reliabilityOfTheSoftwareIsNecessary", setRELY)}

                        {createCell("The size of the program database", "0.94", "theSizeOfTheProgramDatabase", setDATA)}

                        {createCell("Product complexity", "0.85", "productComplexity", setCPLX)}

                        {createCell("Requirements for speed", "-", "requirementsForSpeed", setTIME)}

                        {createCell("Memory limitations", "-", "memoryLimitations", setSTOR)}

                        {createCell("The instability of the environment", "0.87", "theInstabilityOfTheEnvironment", setVIRT)}

                        {createCell("Recovery time", "0.87", "recoveryTime", setTURN)}

                        {createCell("Analytical abilities", "1.19", "analyticalAbilities", setACAP)}

                        {createCell("Software development skills", "1.13", "softwareDevelopmentSkills", setAEXP)}

                        {createCell("Development experience", "1.17", "developmentExperience", setPCAP)}

                        {createCell("Experience using virtual machines", "1.1", "experienceUsingVirtualMachines", setVEXP)}

                        {createCell("Language experience", "1.07", "languageExperience", setLEXP)}

                        {createCell("Development tools", "1.1", "developmentTools", setMODP)}

                        {createCell("Development methods", "1.1", "developmentMethods", setTOOL)}

                        {createCell("Development schedule", "1.08", "developmentSchedule", setSCED)}

                    </div>

                    <div className="text-center">
                        {createPText("Середній")}

                        {createCell("Reliability of the software is necessary", "1", "reliabilityOfTheSoftwareIsNecessary", setRELY)}

                        {createCell("The size of the program database", "1", "theSizeOfTheProgramDatabase", setDATA)}

                        {createCell("Product complexity", "1", "productComplexity", setCPLX)}

                        {createCell("Requirements for speed", "1", "requirementsForSpeed", setTIME)}

                        {createCell("Memory limitations", "1", "memoryLimitations", setSTOR)}

                        {createCell("The instability of the environment", "1", "theInstabilityOfTheEnvironment", setVIRT)}

                        {createCell("Recovery time", "1", "recoveryTime", setTURN)}

                        {createCell("Analytical abilities", "1", "analyticalAbilities", setACAP)}

                        {createCell("Software development skills", "1", "softwareDevelopmentSkills", setAEXP)}

                        {createCell("Development experience", "1", "developmentExperience", setPCAP)}

                        {createCell("Experience using virtual machines", "1", "experienceUsingVirtualMachines", setVEXP)}

                        {createCell("Language experience", "1", "languageExperience", setLEXP)}

                        {createCell("Development tools", "1", "developmentTools", setMODP)}

                        {createCell("Development methods", "1", "developmentMethods", setTOOL)}

                        {createCell("Development schedule", "1", "developmentSchedule", setSCED)}

                    </div>

                    <div className="text-center">
                        {createPText("Високий")}

                        {createCell("Reliability of the software is necessary", "1.15", "reliabilityOfTheSoftwareIsNecessary", setRELY)}

                        {createCell("The size of the program database", "1.08", "theSizeOfTheProgramDatabase", setDATA)}

                        {createCell("Product complexity", "1.15", "productComplexity", setCPLX)}

                        {createCell("Requirements for speed", "1.11", "requirementsForSpeed", setTIME)}

                        {createCell("Memory limitations", "1.06", "memoryLimitations", setSTOR)}

                        {createCell("The instability of the environment", "1.15", "theInstabilityOfTheEnvironment", setVIRT)}

                        {createCell("Recovery time", "1.07", "recoveryTime", setTURN)}

                        {createCell("Analytical abilities", "0.86", "analyticalAbilities", setACAP)}

                        {createCell("Software development skills", "0.91", "softwareDevelopmentSkills", setAEXP)}

                        {createCell("Development experience", "0.86", "developmentExperience", setPCAP)}

                        {createCell("Experience using virtual machines", "0.9", "experienceUsingVirtualMachines", setVEXP)}

                        {createCell("Language experience", "0.95", "languageExperience", setLEXP)}

                        {createCell("Development tools", "0.91", "developmentTools", setMODP)}

                        {createCell("Development methods", "0.91", "developmentMethods", setTOOL)}

                        {createCell("Development schedule", "1.04", "developmentSchedule", setSCED)}

                    </div>

                    <div className="text-center">
                        {createPText("Дуже високий")}

                        {createCell("Reliability of the software is necessary", "1.4", "reliabilityOfTheSoftwareIsNecessary", setRELY)}

                        {createCell("The size of the program database", "1.16", "theSizeOfTheProgramDatabase", setDATA)}

                        {createCell("Product complexity", "1.3", "productComplexity", setCPLX)}

                        {createCell("Requirements for speed", "1.3", "requirementsForSpeed", setTIME)}

                        {createCell("Memory limitations", "1.21", "memoryLimitations", setSTOR)}

                        {createCell("The instability of the environment", "1.3", "theInstabilityOfTheEnvironment", setVIRT)}

                        {createCell("Recovery time", "1.15", "recoveryTime", setTURN)}

                        {createCell("Analytical abilities", "0.71", "analyticalAbilities", setACAP)}

                        {createCell("Software development skills", "0.82", "softwareDevelopmentSkills", setAEXP)}

                        {createCell("Development experience", "0.7", "developmentExperience", setPCAP)}

                        {createCell("Experience using virtual machines", "-", "experienceUsingVirtualMachines", setVEXP)}

                        {createCell("Language experience", "-", "languageExperience", setLEXP)}

                        {createCell("Development tools", "0.82", "developmentTools", setMODP)}

                        {createCell("Development methods", "0.83", "developmentMethods", setTOOL)}

                        {createCell("Development schedule", "1.1", "developmentSchedule", setSCED)}

                    </div>

                    <div className="text-center">
                        {createPText("Критичний")}

                        {createCell("Reliability of the software is necessary", "-", "reliabilityOfTheSoftwareIsNecessary", setRELY)}

                        {createCell("The size of the program database", "-", "theSizeOfTheProgramDatabase", setDATA)}

                        {createCell("Product complexity", "1.65", "productComplexity", setCPLX)}

                        {createCell("Requirements for speed", "1.66", "requirementsForSpeed", setTIME)}

                        {createCell("Memory limitations", "1.56", "memoryLimitations", setSTOR)}

                        {createCell("The instability of the environment", "-", "theInstabilityOfTheEnvironment", setVIRT)}

                        {createCell("Recovery time", "-", "recoveryTime", setTURN)}

                        {createCell("Analytical abilities", "-", "analyticalAbilities", setACAP)}

                        {createCell("Software development skills", "-", "softwareDevelopmentSkills", setAEXP)}

                        {createCell("Development experience", "-", "developmentExperience", setPCAP)}

                        {createCell("Experience using virtual machines", "-", "experienceUsingVirtualMachines", setVEXP)}

                        {createCell("Language experience", "-", "languageExperience", setLEXP)}

                        {createCell("Development tools", "-", "developmentTools", setMODP)}

                        {createCell("Development methods", "-", "developmentMethods", setTOOL)}

                        {createCell("Development schedule", "-", "developmentSchedule", setSCED)}

                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <img src={Png} alt={"Loading..."}/>
            </div>
        </div>
    )
}