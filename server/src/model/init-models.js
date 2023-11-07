import _sequelize, { Sequelize } from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _address from "./address.js";
import _category_group from "./category_group.js";
import _country from "./country.js";
import _geography_columns from "./geography_columns.js";
import _geometry_columns from "./geometry_columns.js";
import _members from "./members.js";
import _policy from "./policy.js";
import _policy_category_group from "./policy_category_group.js";
import _price_items from "./price_items.js";
import _provinces from "./provinces.js";
import _regions from "./regions.js";
import _service_task from "./service_task.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
  }
);

function initModels(sequelize) {
  const address = _address.init(sequelize, DataTypes);
  const category_group = _category_group.init(sequelize, DataTypes);
  const country = _country.init(sequelize, DataTypes);
  const geography_columns = _geography_columns.init(sequelize, DataTypes);
  const geometry_columns = _geometry_columns.init(sequelize, DataTypes);
  const members = _members.init(sequelize, DataTypes);
  const policy = _policy.init(sequelize, DataTypes);
  const policy_category_group = _policy_category_group.init(
    sequelize,
    DataTypes
  );
  const price_items = _price_items.init(sequelize, DataTypes);
  const provinces = _provinces.init(sequelize, DataTypes);
  const regions = _regions.init(sequelize, DataTypes);
  const service_task = _service_task.init(sequelize, DataTypes);

  category_group.belongsToMany(policy, {
    as: "poca_poli_id_policies",
    through: policy_category_group,
    foreignKey: "poca_cagro_id",
    otherKey: "poca_poli_id",
  });
  policy.belongsToMany(category_group, {
    as: "poca_cagro_id_category_groups",
    through: policy_category_group,
    foreignKey: "poca_poli_id",
    otherKey: "poca_cagro_id",
  });
  policy_category_group.belongsTo(category_group, {
    as: "poca_cagro",
    foreignKey: "poca_cagro_id",
  });
  category_group.hasMany(policy_category_group, {
    as: "policy_category_groups",
    foreignKey: "poca_cagro_id",
  });
  provinces.belongsTo(country, {
    as: "prov_country",
    foreignKey: "prov_country_id",
  });
  country.hasMany(provinces, {
    as: "provinces",
    foreignKey: "prov_country_id",
  });
  policy_category_group.belongsTo(policy, {
    as: "poca_poli",
    foreignKey: "poca_poli_id",
  });
  policy.hasMany(policy_category_group, {
    as: "policy_category_groups",
    foreignKey: "poca_poli_id",
  });
  address.belongsTo(provinces, { as: "addr_prov", foreignKey: "addr_prov_id" });
  provinces.hasMany(address, { as: "addresses", foreignKey: "addr_prov_id" });
  country.belongsTo(regions, {
    as: "country_region",
    foreignKey: "country_region_id",
  });
  regions.hasMany(country, {
    as: "countries",
    foreignKey: "country_region_id",
  });

  return {
    address,
    category_group,
    country,
    geography_columns,
    geometry_columns,
    members,
    policy,
    policy_category_group,
    price_items,
    provinces,
    regions,
    service_task,
  };
}

const model = initModels(sequelize);
export default model;
export { sequelize };
