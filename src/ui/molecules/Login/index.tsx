import { Formik, Form } from "formik";

import * as S from "./styles";

import { Button } from "src/ui/components";
import { MyCurrentAccount } from "src/ui/organisms";
import { Input } from "src/ui/molecules";
import { signInValidations } from "src/validations";
import { useDispatch } from "react-redux";
import { signIn } from "src/modules";

const defaultValues = {
  password: "",
  account: "",
};

export const Login = () => {
  const dispatch = useDispatch()
  return (
    <S.Wrapper>
      <h4>Sign In</h4>
      <Formik
        initialValues={defaultValues}
        onSubmit={ (values) => {
          console.log("VALUES:", values);
          dispatch(signIn(values.password, values.account))
        }}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <MyCurrentAccount />
            <Input
              label="Password"
              placeholder="Enter a new password for this account"
              type="password"
              name="password"
            // error={errors.password && touched.password && errors.password}
            />
            <Button
              title="Sign In"
              type="submit"
              style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
            />
          </Form>
        )}
      </Formik>
    </S.Wrapper >
  );
};
