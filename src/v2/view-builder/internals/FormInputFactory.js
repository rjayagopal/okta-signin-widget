import { Collection, _ } from 'okta';
import FactorEnrollOptions from '../components/FactorEnrollOptions';
import FactorUtil from '../../util/FactorUtil';

const changeLabelToTop = (opt) => {
  return Object.assign({}, opt, { 'label-top': true });
};

const createFactorTypeView = (opt) => {
  var optionItems = (opt.options || [])
    .map(opt => {
      return Object.assign({}, opt, FactorUtil.getFactorData(opt.value));
    });
  return {
    View: FactorEnrollOptions,
    options: {
      collection: new Collection(optionItems),
    }
  };
};
const inputCreationStrategy = {
  text: changeLabelToTop,
  password: changeLabelToTop,
  factorType: createFactorTypeView,
};

const create = function (uiSchemaObj) {
  const strategyFn = inputCreationStrategy[uiSchemaObj.type] || _.identity;

  return strategyFn(uiSchemaObj);
};
module.exports = {
  create,
};