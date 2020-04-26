const { Test, screenName } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for max basal', () => {
    var test;
    it('should launch with pump simulator', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    it('setup without max basal applied', async () => {
        var expectations = async function () {
            await test.settingsScreen.HasAlert();
            await test.settingsScreen.DismissAlert();
        };
        await test.settingsScreen.SetDeliveryLimits({ maxBolus: '10.0', maxBasalRate: '' }, expectations);
    });
});

