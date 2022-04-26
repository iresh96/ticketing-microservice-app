import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      setErrors(null);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger mt-3">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return {
    errors,
    doRequest,
  };
};

export default useRequest;
