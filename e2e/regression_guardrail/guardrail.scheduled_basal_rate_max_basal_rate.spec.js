const { loop } = require('../../src/index');

describe('guardrail settings basal rate cannot be higher than the max basal rate', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('setup without Insulin Sensitivities applied', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBasalRate: '1.0', maxBolus: '10.0' },
                BasalRates: [{ time: '12:00 AM', unitsPerHour: '1.1' }]
            }
        });
    });
});

