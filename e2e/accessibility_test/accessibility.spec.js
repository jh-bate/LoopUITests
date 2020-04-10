const { loop } = require('../../src/index');

describe('accessibility', () => {
    beforeAll(async () => {
        await loop.Launch();
    });
    describe('home', () => {
        it('has a Active Carbohydrates Label', async () => {
            await expect(loop.screens.home.ActiveCarbohydratesLabel()).toExist();
        });
        it('has a Active Insulin Label', async () => {
            await expect(loop.screens.home.ActiveInsulinLabel()).toExist();
        });
        it('has a Insulin Delivery Label', async () => {
            await expect(loop.screens.home.InsulinDeliveryLabel()).toExist();
        });
        it('has a Glucose Label', async () => {
            await expect(loop.screens.home.GlucoseLabel()).toExist();
        });
        it('has a Settings Button', async () => {
            await expect(loop.screens.home.SettingsButton()).toExist();
        });
        it('has a Add Meal Button', async () => {
            await expect(loop.screens.home.AddMealButton()).toExist();
        });
        it('has a Bolus Button', async () => {
            await expect(loop.screens.home.BolusButton()).toExist();
        });
    });
    describe('bolus', () => {
        beforeAll(async () => {
            await loop.screens.bolus.Open();
        });
        afterAll(async () => {
            await loop.screens.bolus.Cancel();
        });
        it('has a Bolus Header', async () => {
            await expect(loop.screens.bolus.BolusHeader()).toExist();
        });
        it('has a Deliver Button', async () => {
            await expect(loop.screens.bolus.DeliverButton()).toExist();
        });
        it('has a Disabled Deliver Button', async () => {
            await expect(loop.screens.bolus.DisabledDeliverButton()).toExist();
        });
        it('has a Recommended Label', async () => {
            await expect(loop.screens.bolus.RecommendedLabel()).toExist();
        });
        it('has a Entered Label', async () => {
            await expect(loop.screens.bolus.EnteredLabel()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(loop.screens.bolus.CancelHeaderButton()).toExist();
        });
    });
    describe('add meal', () => {
        beforeAll(async () => {
            await loop.screens.carbEntry.Open();
        });
        afterAll(async () => {
            await loop.screens.carbEntry.Cancel();
        });
        it('has a Add Carb Entry Header', async () => {
            await expect(loop.screens.carbEntry.AddCarbEntryHeader()).toExist();
        });
        it('has a Cancel Header Button', async () => {
            await expect(loop.screens.carbEntry.CancelHeaderButton()).toExist();
        });
        it('has a Disabled Continue Main Button', async () => {
            await expect(loop.screens.carbEntry.DisabledContinueMainButton()).toExist();
        });
        it('has a Disabled Continue Header Button', async () => {
            await expect(loop.screens.carbEntry.DisabledContinueHeaderButton()).toExist();
        });
        it('has a Absorption Time Message', async () => {
            await expect(loop.screens.carbEntry.AbsorptionTimeMessage()).toExist();
        });
        it('has a Absorption Time Label', async () => {
            await expect(loop.screens.carbEntry.AbsorptionTimeLabel()).toExist();
        });
        it('has a Date Label', async () => {
            await expect(loop.screens.carbEntry.DateLabel()).toExist();
        });
        it('has a Amount Consumed Label', async () => {
            await expect(loop.screens.carbEntry.AmountConsumedLabel()).toExist();
        });
        it('has a Food Type Label', async () => {
            await expect(loop.screens.carbEntry.FoodTypeLabel()).toExist();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await loop.screens.settings.Open();
        });
        afterAll(async () => {
            await loop.screens.settings.Close();
        });
        it('has a done button', async () => {
            await expect(loop.screens.settings.DoneButton()).toExist();
        });
        it('has a configuration header', async () => {
            await expect(loop.screens.settings.ConfigurationHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(loop.screens.settings.PumpHeader()).toExist();
        });
        it('has a pump header', async () => {
            await expect(loop.screens.settings.ContinuousGlucoseMonitorHeader()).toExist();
        });
        it('has a settings header', async () => {
            await expect(loop.screens.settings.SettingsHeader()).toExist();
        });
        it('has a Issue Report Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.IssueReportLabel()).toExist();
        });
        it('has a Correction Range Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.CorrectionRangeLabel()).toExist();
        });
        it('has a Suspend Threshold label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.SuspendThresholdLabel()).toExist();
        });
        it('has a Basal Rates Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.BasalRatesLabel()).toExist();
        });
        it('has a Delivery Limits Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.DeliveryLimitsLabel()).toExist();
        });
        it('has a Insulin Model Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.InsulinModelLabel()).toExist();
        });
        it('has a Carb Ratios Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.CarbRatiosLabel()).toExist();
        });
        it('has a Insulin Sensitivities Label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.InsulinSensitivitiesLabel()).toExist();
        });
        it('has a Closed Loop button', async () => {
            await expect(loop.screens.settings.ClosedLoopButton()).toExist();
        });
        it('has a Issue Report button', async () => {
            await expect(loop.screens.settings.IssueReportLabel()).toExist();
        });
        it('has a Add Pump label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.AddPumpLabel()).toExist();
        });
        it('has a Add CGM label', async () => {
            //TODO: this is acting like a button!
            await expect(loop.screens.settings.AddCGMLabel()).toExist();
        });
        it('has a services header', async () => {
            await loop.screens.settings.ScrollToBottom();
            await expect(loop.screens.settings.ServicesHeader()).toExist();
        });
    });
});
