const { loop } = require('../../src/index');

describe('guardrail settings max basal rate', () => {
    it('set 35 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '1.0', maxBasalRate: '35.0' }
            }
        });
        //TODO assert no warning
    });
    it('cannot set 36 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '1.0', maxBasalRate: '36.0' }
            }
        });
        //TODO assert warning
    });
});

