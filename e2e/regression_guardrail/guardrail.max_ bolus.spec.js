const { loop } = require('../../src/index');

describe('guardrail settings max bolus', () => {
    it('cannot set 30.1 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '30.1', maxBasalRate: '1.0' }
            }
        });
        //TODO assert on warning
    });
    it('set 30 units, warning', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '30.0', maxBasalRate: '1.0' }
            }
        });
        //TODO assert on warning
    });
    it('set 20 units, warning', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '20.0', maxBasalRate: '1.0' }
            }
        });
        //TODO assert on warning
    });
    it('set 0 units, warning', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '0.0', maxBasalRate: '1.0' }
            }
        });
        //TODO assert on warning
    });
    it('cannot set under 0 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '-0.1', maxBasalRate: '1.0' }
            }
        });
        //TODO assert on warning
    });
});

