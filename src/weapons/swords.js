const { readJSON, writeJSON, write } = require("fs-extra");

const readDB = async (filepath) => {
  try {
    const fileJSON = await readJSON(filepath);
    return fileJSON;
  } catch (error) {
    throw new Error(error);
  }
};

const writeDB = async (filepath, fileContent) => {
  try {
    await writeJSON(filepath, fileContent);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getFile: async (filepath) => readJSON(filepath),
  writeFile: async (filepath, fileContent) => writeJSON(filepath, fileContent),
};
