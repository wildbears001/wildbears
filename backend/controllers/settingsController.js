import settingsModel from '../models/settingsModel.js';

export const getSettings = async (req, res) => {
    try {
        let settings = await settingsModel.findOne();
        if (!settings) {
            settings = await settingsModel.create({});
        }
        res.json({ success: true, settings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const updateCod = async (req, res) => {
    try {
        const { isCodEnabled } = req.body;
        let settings = await settingsModel.findOne();
        if (!settings) {
            settings = await settingsModel.create({});
        }
        settings.isCodEnabled = isCodEnabled;
        await settings.save();
        res.json({ success: true, message: "COD setting updated", settings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const updateSocialLinks = async (req, res) => {
    try {
        const { instagram, facebook, twitter, youtube, phone, email } = req.body;
        let settings = await settingsModel.findOne();
        if (!settings) settings = await settingsModel.create({});
        
        settings.socialLinks = { instagram, facebook, twitter, youtube };
        if (phone !== undefined || email !== undefined) {
             settings.contactInfo = { phone: phone || settings.contactInfo?.phone, email: email || settings.contactInfo?.email };
        }
        await settings.save();
        
        res.json({ success: true, message: "Global configurations synchronized", settings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
