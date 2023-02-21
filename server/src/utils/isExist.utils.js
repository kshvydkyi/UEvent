export const isExistUtils = async (Service ,field, value) => {
    const service = new Service();
    const isExistValue = await service.isExist(field, value);
    return isExistValue;
}