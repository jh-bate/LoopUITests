const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for max bolus', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('setup without max bolus rates applied', async () => {
        await loop.screens.settings.Open();
        await loop.screens.settings.AddPumpSimulator();
        var expectations = async function () {
            await loop.screens.settings.HasAlert();
            await loop.screens.settings.DismissAlert();
        };
        await loop.screens.settings.SetDeliveryLimits({ maxBolus: '', maxBasalRate: '5.0' }, expectations);
    });
});

