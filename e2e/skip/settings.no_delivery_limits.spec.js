const { LoopTest, setting, target, screenName } = require('../../src/index');

describe('Closed loop is not allowed when settings are not applied for delivery limits', () => {
    var loopTest;
    it('should without delivery limits applied', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withScenario('flat_cgm_trace')
            .withSettings(setting.default)
            .withSettingsFilter([setting.type.DeliveryLimits])
            .withStartScreen(screenName.settings)
            .build();
    });
    it('should not be in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopStatusConfigurationAlert();
    });
});

