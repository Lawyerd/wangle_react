export default function validate(data) {
  const errors = {};
  const { name, phone, email, country, birth } = data;
  //   console.log(data);
  if (!name) {
    errors.name = "이메일이 입력되지 않았습니다.";
  }

  if (!phone) {
    errors.phone = "이메일이 입력되지 않았습니다.";
  }

  if (!email) {
    errors.email = "이메일이 입력되지 않았습니다.";
  } else {
    if (!email_val(email)) {
      errors.email = "이메일 형식이 잘못되었습니다.";
    }
  }

  if (!country) {
    errors.country = "국적이 입력되지 않았습니다.";
  }

  if (!birth) {
    errors.birth = "생년월일이 입력되지 않았습니다.";
  }
  //   console.log(errors);

  return errors;
}

function email_val(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
