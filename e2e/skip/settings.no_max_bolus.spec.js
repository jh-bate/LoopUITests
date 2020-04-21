const { LoopTest, target, screenName } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for max bolus', () => {
    var loopTest;
    it('should lauch with pump simulator', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings)
            .build();
    });
    it('setup without max bolus rates applied', async () => {
        var expectations = async function () {
            await loopTest.settingsScreen.HasAlert();
            await loopTest.settingsScreen.DismissAlert();
        };
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '', maxBasalRate: '5.0' }, expectations);
    });
});

