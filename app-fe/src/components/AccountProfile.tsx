import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../service/UserService.ts";
import Avatar from "@mui/material/Avatar";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isAdmin?: boolean;
  access_token: string;
};

type Props = {
  user: User;
};

export default function AccountProfile({ user }: Props) {
  console.log("user 5", user);

  const [formData, setFormData] = useState({ ...user });
  console.log("user 55", formData);
  console.log("user 66", user._id);
  console.log("user 77", formData._id);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const updateMutation = useMutation({
    mutationFn: () => updateUser(formData._id, formData, user.access_token),
    onSuccess: () => {
      setSuccessMsg("✅ Cập nhật thành công!");
      setErrorMsg("");
    },
    onError: (err: any) => {
      setErrorMsg(err?.response?.data?.message || "❌ Cập nhật thất bại");
      setSuccessMsg("");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Avatar
        src="/broken-image.jpg"
        sx={{ width: 200, height: 200, marginRight: "20px" }}
      />
      <Paper sx={{ width: "70%" }}>
        <div style={{ padding: "30px" }}>
          <Typography variant="h6" gutterBottom>
            Thông tin tài khoản
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Họ tên"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={user.email}
              disabled
            />
            <TextField
              name="phone"
              label="Số điện thoại"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              name="address"
              label="Địa chỉ"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange}
            />

            {updateMutation.isPending ? (
              <Box mt={2} display="flex" justifyContent="center">
                <CircularProgress size={24} />
              </Box>
            ) : (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: "20px" }}
              >
                Cập nhật
              </Button>
            )}
          </form>
        </div>

        {successMsg && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMsg}
          </Alert>
        )}
        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}
      </Paper>
    </div>
  );
}
