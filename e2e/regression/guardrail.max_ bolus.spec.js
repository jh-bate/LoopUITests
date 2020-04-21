const { LoopTest, screenName, target } = require('../../src/index');

describe('guardrail settings max bolus', () => {
    var loopTest;
    it('should setup with correct configuration', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings)
            .build();
    });

    it('cannot set 30.1 units', async () => {
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '30.1', maxBasalRate: '1.0' });
        //TODO assert on warning
    });
    it('set 30 units, warning', async () => {
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '30.0', maxBasalRate: '1.0' });
        //TODO assert on warning
    });
    it('set 20 units, warning', async () => {
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '20.0', maxBasalRate: '1.0' });
        //TODO assert on warning
    });
    it('set 0 units, warning', async () => {
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '0.0', maxBasalRate: '1.0' });
        //TODO assert on warning
    });
    it('cannot set under 0 units', async () => {
        await loopTest.settingsScreen.SetDeliveryLimits({ maxBolus: '-0.1', maxBasalRate: '1.0' });
        //TODO assert on warning
    });
});

