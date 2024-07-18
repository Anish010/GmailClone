import React, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  InputBase,
  styled,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { BorderBottom, Close } from "@mui/icons-material";
import useApi from "../../hooks/useApi";
import { API_URLS } from "../../services/api.urls";
import { useParams } from "react-router-dom";

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.24)",
  borderRadius: "10px 10px 0 0",
};

const HeaderBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 0.8rem",
  backgroundColor: "#F2F6FC",
  "& > p": {
    color: "#041E49",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
});

const InputWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 1rem;",
  "& > div": {
    fontSize: "0.9rem",
    borderBottom: "1px solid #E4E4E4",
    marginTop: "0.6rem",
  },
});

const FooterBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem 0.8rem",
  alignItems: "center",
  "& > span": {
    fontSize: "1.2rem",
  },
});

const SendButton = styled(Box)({
  backgroundColor: "#1B61D1",
  color: "#FFFFFF",
  width: "4.5rem",
  textTransform: "none",
  padding: "7px 1px",
  display: "flex",
  justifyContent: "center",
  fontWeight: 500,
  alignItems: "center",
  fontSize: "0.9rem",
  borderRadius: "20px 0 0 20px",
  "&: hover": {
    backgroundColor: "#1f67db",
  },
});

const DeleteMailButton = styled(Box)({
  padding: "4px 5px 0 4px",
  "& > span": {
    fontSize: "1.2rem",
  },
  "&:hover": {
    backgroundColor: "#E4E4E4",
    cursor: "pointer",
  },
});

const TextStyleButton = styled(Box)({
  backgroundColor: "#1B61D1",
  color: "#FFFFFF",
  width: "2rem",
  textTransform: "none",
  padding: "5px 0",
  display: "flex",
  justifyContent: "center",
  fontWeight: 500,
  alignItems: "center",
  borderRadius: "0 20px 20px 0",
  borderLeft: "1px solid black",
  "& > span": {
    fontSize: "1.2rem",
  },
  "&: hover": {
    backgroundColor: "#1f67db",
  },
});

const SendButtonWrapper = styled(Box)({
  display: "flex",
  borderRadius: "20px",
  "&: hover": {
    cursor: "pointer",
    boxShadow: "0px 1px 2px #4b85e3",
  },
});

const ComposeMail = ({ setOpenDialog, openDialog }) => {
  const [data, setData] = useState({});
  const { type } = useParams();
  const sendEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);
  const getEmailService = useApi(API_URLS.getEmailFromType);

  const closeComposeMail = (e) => {
    e.preventDefault();
    const payload = {
      to: data.to,
      subject: data.subject,
      body: data.body,
      from: import.meta.env.VITE_SOURCE_EMAIL,
      date: new Date(),
      image: "",
      name: "Project - GMAIL CLONE",
      starred: false,
      type: "draft",
    };

    saveDraftService.call(payload);
    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
    } else {
      alert("Failed to send email.");
    }
    setOpenDialog(false);
  };

  const config = {
    Host: import.meta.env.VITE_SMTP_HOST,
    Username: import.meta.env.VITE_APP_USERNAME,
    Password: import.meta.env.VITE_APP_PASSWORD,
    Port: import.meta.env.VITE_SMTP_PORT,
    From: import.meta.env.VITE_SOURCE_EMAIL,
  };

  const sendMail = (e) => {
    e.preventDefault();
    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }

    const payload = {
      to: data.to,
      subject: data.subject,
      body: data.body,
      from: import.meta.env.VITE_SOURCE_EMAIL,
      date: new Date(),
      image: "",
      name: "Project - GMAIL CLONE",
      starred: false,
      type: "sent",
    };

    sendEmailService.call(payload);
    if (!sendEmailService.error) {
      setOpenDialog(false);
      setData({});
    } else {
      alert("Failed to send email.");
    }
    setOpenDialog(false);
    getEmailService.call({}, type);
  };

  const deleteMail = (e) => {
    e.preventDefault();
    console.log("Email sent!");
    setOpenDialog(false);
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={openDialog}
      PaperProps={{
        sx: dialogStyle,
      }}>
      <HeaderBox>
        <Typography>New Message</Typography>
        <Box>
          <Close
            color="action"
            fontSize="small"
            sx={{
              display: "flex",
              alignItems: "center",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={(e) => closeComposeMail(e)}
          />
        </Box>
      </HeaderBox>
      <InputWrapper>
        <InputBase
          placeholder="Recipients"
          name="to"
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
        />
      </InputWrapper>
      <TextField
        multiline
        rows={20}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        onChange={(e) => onValueChange(e)}
      />
      <FooterBox>
        <SendButtonWrapper>
          <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
          <TextStyleButton>
            <span className="material-symbols-rounded">arrow_drop_down</span>
          </TextStyleButton>
        </SendButtonWrapper>
        <DeleteMailButton>
          <span
            className="material-symbols-rounded"
            onClick={(e) => deleteMail(e)}>
            delete
          </span>
        </DeleteMailButton>
      </FooterBox>
    </Dialog>
  );
};

export default ComposeMail;
