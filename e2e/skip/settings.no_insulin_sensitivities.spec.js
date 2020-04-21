const { LoopTest, setting, target, screenName } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for Insulin Sensitivities', () => {
    var loopTest;
    it('should without Insulin Sensitivities applied', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withScenario('flat_cgm_trace')
            .withSettings(setting.default)
            .withSettingsFilter([setting.type.InsulinSensitivities])
            .withStartScreen(screenName.settings)
            .build();
    });
    it('should not be in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopStatusCarbsAlert();
    });
});

