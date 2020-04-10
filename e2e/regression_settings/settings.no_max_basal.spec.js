const { loop } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for max basal', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('setup without max basal applied', async () => {
        await loop.screens.settings.Open();
        await loop.screens.settings.AddPumpSimulator();
        var expectations = async function () {
            await loop.screens.settings.HasAlert();
            await loop.screens.settings.DismissAlert();
        };
        await loop.screens.settings.SetDeliveryLimits({ maxBolus: '10.0', maxBasalRate: '' }, expectations);
    });
});

