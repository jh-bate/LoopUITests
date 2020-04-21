const { LoopTest, screenName, target } = require('../../src/index');

describe('guardrail settings basal rate cannot be higher than the max basal rate', () => {
    var loopTest;
    it('should setup with correct configuration with delivery limits', async () => {
        loopTest = await new LoopTest.Builder(target.tidepool)
            .withSettings({ AddPumpSimulator: true, DeliveryLimits: { maxBasalRate: '1.0', maxBolus: '10.0' } })
            .withStartScreen(screenName.settings)
            .build();
    });
    it('set basal rate higher than max basal rate', async () => {
        await loopTest.settingsScreen.SetBasalRates([{ time: '12:00 AM', unitsPerHour: '1.1' }]);
        //TODO assert warning
    });
});

