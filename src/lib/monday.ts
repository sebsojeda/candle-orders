import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
monday.setToken(import.meta.env.VITE_MONDAY_TOKEN);

export default monday;
