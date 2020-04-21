const { loop, setting, screenName, target } = require('../../src/index');

describe.skip('Closed loop is stopped when we have cgm data loss', () => {

    var loopTest;
    afterAll(async () => {
        await loopTest.removeData();
    });
    it('should setup with correct configuration', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withScenario('flat_cgm_trace')
            .withSettings(setting.default)
            .withStartScreen(screenName.home)
            .build();
    });
    it('should not be in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await loopTest.advanceScenario('1');
    });
    it('should have no status alert', async () => {
        await loopTest.homeScreen.ExpectSuccessfulLoop();
    });
    it('cgm data is turned off', async () => {
        await loopTest.settingsScreen.SetCGMSimulatorSettings({ modelData: { bgValues: [], model: loop.settings.cgmModel.None } })
    });
    it('should have CGM data status alert', async () => {
        await loopTest.homeScreen.ExpectLoopStatusGlucoseDataAlert();
    });
});
