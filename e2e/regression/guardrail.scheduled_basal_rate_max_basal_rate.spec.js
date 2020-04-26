const { Test, screenName } = require('../../src/index');

describe('guardrail settings basal rate cannot be higher than the max basal rate', () => {
    var test;
    it('should setup with correct configuration with delivery limits', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true, DeliveryLimits: { maxBasalRate: '1.0', maxBolus: '10.0' } })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    it('set basal rate higher than max basal rate', async () => {
        await test.settingsScreen.SetBasalRates([{ time: '12:00 AM', unitsPerHour: '1.1' }]);
        //TODO assert warning
    });
});

