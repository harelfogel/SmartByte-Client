


const temperatureMap = {
    1: 15,
    2: 20,
    3: 27,
    4: 35
}


export const generateRule = (suggestion) => {
    const { device, evidence, state } = suggestion;
    const isAcDevice = device.toLowerCase() === 'ac';
    const conditions = Object.entries(evidence).map(condition => {
        const [key, value] = condition;
        return `${key} < ${temperatureMap[value]}`;
    }).join(' AND ');

    const action = `("${device} ${state}")`;

    const generatedRule = `IF ${conditions} THEN TURN${action}`;
    console.log({generatedRule})
    return generatedRule;

}   