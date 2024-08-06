import moment from "moment";
import ExcelJS from "exceljs";

export const ExportEcelFile = (response) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("ApiTransactionData");
  sheet.properties.defaultRowHeight = 30;

  sheet.getRow(1).font = {
    size: 10,
    bold: true,
  };

  sheet.columns = [
    {
      header: "S.No",
      key: "S_No",
      width: 5,
    },
    {
      header: "Application No",
      key: "application_number",
      width: 15,
    },
    {
      header: "UserId",
      key: "user_id",
      width: 10,
    },
    {
      header: "Email",
      key: "email",
      width: 25,
    },
    {
      header: "User Name",
      key: "username",
      width: 20,
    },
    {
      header: "Services",
      key: "services",
      width: 20,
    },
    {
      header: "PID",
      key: "pid",
      width: 15,
    },
    {
      header: "State",
      key: "state",
      width: 20,
    },
    {
      header: "Client Name",
      key: "client_name",
      width: 20,
    },
    {
      header: "Account Type",
      key: "accounttype",
      width: 15,
    },
    {
      header: "Rate Per Check",
      key: "amount",
      width: 15,
    },
    {
      header: "Search Key",
      key: "search_key",
      width:30,
    },
    {
      header: "Date & Time",
      key: "created_at",
      width: 25,
    },
  ];
  const transformData = (data) => {
    const parsedData = JSON.parse(data);
    return Object.entries(parsedData).map(([key, value]) => {
      const formattedKey = key.toUpperCase();
      return `${formattedKey}: "${value}"`;
    }).join(", ");
  };
  response?.map((val, i) => {
    sheet.addRow({
      S_No: `${i + 1}`,
      application_number: val?.application_number,
      user_id: val?.user_id?.toString(),
      email: val?.email,
      username: val?.name,
      services: val?.tbl_plan_list?.service_name,
      pid: val?.tbl_plan_list?.PID,
      state: val?.state,
      client_name: val?.client_name,
      accounttype: val?.type,
      amount: val?.price?.toString(),
      search_key: val?.search_data ? transformData(val?.search_data) : "-",
      created_at: moment(val?.created_at).format("ddd MMM DD YYYY HH:mm:ss"),
    });
  });
  workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ApiTransaction.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
  });
};
