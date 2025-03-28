export const formFactory = (type) => {
  if (type === "login") {
    return {
      fields: [
        { name: "email", label: "Email", type: "email", isRequired: true },
        {
          name: "password",
          label: "Mật khẩu",
          type: "password",
          isRequired: true,
        },
      ],
      apiEndpoint: `${process.env.REACT_APP_API}/auth/login`,
    };
  } else if (type === "register") {
    return {
      fields: [
        { name: "name", label: "Tên", type: "text", isRequired: true },
        {
          name: "numPhone",
          label: "Số điện thoại",
          type: "tel",
          isRequired: true,
        },
        { name: "email", label: "Email", type: "email", isRequired: true },
        {
          name: "gender",
          label: "Giới tính",
          type: "radio",
          options: ["male", "female"],
          isRequired: true,
        },
        {
          name: "role",
          label: "Bạn là",
          type: "radio",
          options: ["tenant", "landlord"],
          isRequired: true,
        },
        {
          name: "password",
          label: "Mật khẩu",
          type: "password",
          isRequired: true,
        },
        {
          name: "confirmPassword",
          label: "Nhập lại mật khẩu",
          type: "password",
          isRequired: true,
        },
      ],
      apiEndpoint: `${process.env.REACT_APP_API}/auth/register`,
    };
  }
  throw new Error("Unknown form type");
};
