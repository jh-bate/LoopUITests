const match = require('./match');

class BolusScreen {
    constructor(language) {
        this.language = language;
    }
    /**
     * @example await bolus.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(this.language.bolusScreen.Bolus).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await bolus.Cancel();
     */
    async Cancel() {
        await this.CancelHeaderButton().tap();
    }
    CancelHeaderButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    /**
     * @example await bolus.Deliver();
     */
    async Deliver() {
        await this.DeliverButton().tap();
    }
    DeliverButton() {
        return match.accessible.Button(this.language.bolusScreen.Deliver);
    }
    DisabledDeliverButton() {
        return match.accessible.DisabledButton(this.language.bolusScreen.Deliver);
    }
    BolusHeader() {
        return match.accessible.Header(this.language.bolusScreen.Bolus);
    }
    BolusLabel() {
        return match.accessible.Label(this.language.bolusScreen.Bolus);
    }
    EnteredLabel() {
        return match.accessible.Label(this.language.bolusScreen.Entered);
    }
    RecommendedLabel() {
        return match.accessible.Label(this.language.bolusScreen.Recommended);
    }
    /**
     * @example await bolus.ExpectCannotDeliverBolus();
     */
    async ExpectCannotDeliverBolus() {
        await expect(match.accessible.DisabledButton(this.language.bolusScreen.Deliver)).toExist();
    }
    /**
     * @param {number} units
     * @example await bolus.SetBolusAmount(10.5);
     */
    async SetBolusAmount(units) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(units);
    }
    /**
     * @example await bolus.SetAuthentication();
     */
    async SetAuthentication() {
        await match.UITextField().clearText();
        await match.UITextField().typeText(units);
    }
};

module.exports = { BolusScreen };
