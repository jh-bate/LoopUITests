const { LoopTest, screenName, target } = require('../../src/index');

describe('guardrail settings max basal rate', () => {
    var loopTest;
    it('should setup with correct configuration', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings)
            .build();
    });

    it('set 35 units', async () => {
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '1.0', maxBasalRate: '35.0' });
        //TODO assert on warning
    });
    it('cannot set 36 units', async () => {
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '1.0', maxBasalRate: '36.0' });
        //TODO assert warning
    });
});

