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
