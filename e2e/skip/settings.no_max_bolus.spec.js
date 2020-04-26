const { Test, screenName } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for max bolus', () => {
    var test;
    it('should launch with pump simulator', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    it('setup without max bolus rates applied', async () => {
        var expectations = async function () {
            await test.settingsScreen.HasAlert();
            await test.settingsScreen.DismissAlert();
        };
        await test.settingsScreen.SetDeliveryLimits({ maxBolus: '', maxBasalRate: '5.0' }, expectations);
    });
});

