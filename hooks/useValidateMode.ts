import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { commonActions } from "../store/common";

export default function useValidateMode() {
  const dispatch = useDispatch();
  const { validateMode } = useSelector((state) => state.common);

  const setValidateMode = (value: boolean) => {
    dispatch(commonActions.setValidateMode(value));
  };

  return {
    validateMode,
    setValidateMode,
  };
}
