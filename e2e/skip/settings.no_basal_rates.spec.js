const { LoopTest, setting, screenName, target } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for basal rates', () => {
    var loopTest;
    it('should without basal rates applied', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withScenario('flat_cgm_trace')
            .withSettings(setting.default)
            .withSettingsFilter([setting.type.BasalRates])
            .withStartScreen(screenName.settings)
            .build();
    });
    afterAll(async () => {
        await loopTest.removeData();
    });
    it('should not be in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopStatusInsulinAlert()
    });
});

