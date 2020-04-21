const { LoopTest, setting, target, screenName } = require('../../src/index');

describe.skip('Closed loop is allowed when', () => {
    var loopTest;
    it('should launch with all settings applied', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withScenario('flat_cgm_trace_with_basal')
            .withSettings(setting.default)
            .withStartScreen(screenName.home)
            .build();
    });
    it('should not be in closed loop mode', async () => {
        await loopTest.homeScreen.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await loop.advanceScenario('1');
    });
    it('should have no status alert', async () => {
        await loopTest.homeScreen.ExpectSuccessfulLoop();
    });
});
