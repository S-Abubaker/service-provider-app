import Provider from "../models/Provider.js";

export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.send(providers);
  } catch (error) {
    console.log(error.message);
  }
};

export const addProvider = async (req, res) => {
  const newProvider = new Provider(req.body);
  try {
    await newProvider.save();
    res.send(newProvider);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProvider = async (req, res) => {
  const { id } = req.params;
  try {
    await Provider.findByIdAndRemove(id);
    res.send(`provider deleted`);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProvider = async (req, res) => {
  const { id } = req.params;
  const {
    providerName,
    providerContact,
    providerService,
    providerSalary,
    shortDesc,
    selectedFile,
    userId
  } = req.body;

  try {
    const updatedProvider = {
      providerName,
      providerContact,
      providerService,
      providerSalary,
      shortDesc,
      selectedFile,
      userId,
      _id: id,
    };

    await Provider.findByIdAndUpdate(id, updatedProvider, { new: true });

    res.send(updatedProvider);
  } catch (error) {
    console.log(error.message);
  }
};
