import { ArrowBack } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { emptyProfilePic } from "../../constants/constants";
import useApi from "../../hooks/useApi";
import { API_URLS } from "../../services/api.urls";
import { routes } from "../../routes/routes";

const IconWrapper = styled(Box)({
  padding: "1rem",
});

const Subject = styled(Typography)({
  fontSize: "1.5rem",
  margin: "0.6rem 0 1.2rem 4.7rem",
  display: "flex",
});

const IndicatorWrapper = styled(Box)({
  fontSize: "0.7rem",
  cursor: "pointer",
  background: "#ddd",
  color: "#222",
  marginLeft: 6,
  borderRadius: "0.3rem",
  alignSelf: "center",
  display: "flex",
});

const Indicator = styled(Box)({
  padding: "2px 3px 2px 4px",
  borderRadius: "0.3rem 0 0 0.3rem",
  "&:hover": {
    backgroundColor: "#666666",
    color: "#fff",
  },
});

const CrossIcon = styled(Box)({
  padding: "2px 4px 2px 2px",
  borderRadius: "0 0.3rem 0.3rem 0",
  display: "flex",
  "& > span": {
    fontSize: "0.7rem",
    alignSelf: "center",
  },
  "&:hover": {
    backgroundColor: "#666666",
    color: "#fff",
  },
});

const Container = styled(Box)({
  marginLeft: "0.9rem",
  width: "100%",
  "& > div": {
    display: "flex",
    "& > span > p": {
      fontSize: "1.2rem",
      color: "#5E5E5E",
    },
  },
});

const Date = styled(Box)({
  margin: "0 3rem 0 auto !important",
  fontSize: 12,
  color: "#5E5E5E",
});

const Image = styled("img")({
  borderRadius: "50%",
  width: "2.5rem",
  height: "2.5rem",
  margin: "5px 10px 0 10px",
  backgroundColor: "#cccccc",
});

const ViewEmail = () => {
  const { openDrawer } = useOutletContext();
  const { state } = useLocation();
  const { email } = state;
  const navigate = useNavigate();

  const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
  const updateEmailLabel = useApi(API_URLS.updateEmailLabel);

  const deleteEmail = () => {
    moveEmailsToBin.call([email._id]);
    window.history.back();
  };

  const removeLabel = () => {
    if (email.type === "inbox") {
      updateEmailLabel.call({ id: email._id, type: "" });
    } else {
      updateEmailLabel.call({ id: email._id, type: "inbox" });
    }
    window.history.back();
  };

  const getType = () => {
    if (email.trash) {
      return "Trash";
    } else if (email.type === "draft") { }
    else{
      return email.type.charAt(0).toUpperCase() + email.type.slice(1);
    }
  };

  return (
    <Box style={openDrawer ? { marginLeft: "17%" } : { width: "100%" }}>
      <IconWrapper>
        <ArrowBack
          style={{ cursor: "pointer" }}
          onClick={() => window.history.back()}
          color="action"
          fontSize="small"
        />
        <span
          className="material-symbols-outlined"
          style={{ cursor: "pointer", marginLeft: "3rem", fontSize: "1.2rem" }}
          onClick={() => deleteEmail()}>
          delete
        </span>
      </IconWrapper>
      <Subject>
        {email.subject}{" "}
        {(email.type !== "" || email.trash) && (
          <IndicatorWrapper component="span">
            <Indicator
              component="span"
              onClick={() =>
                navigate(`${routes.emails.path}/${getType().toLowerCasee()}`)
              }>
              {getType()}
            </Indicator>
            <CrossIcon onClick={() => removeLabel()}>
              <span className="material-symbols-outlined">close</span>
            </CrossIcon>
          </IndicatorWrapper>
        )}
      </Subject>
      <Box style={{ display: "flex" }}>
        <Image src={emptyProfilePic} alt="profile picture" />
        <Container>
          <Box>
            <Typography style={{ marginTop: "0.6rem" }}>
              {email.name}
              <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
            </Typography>
            <Date>
              {new window.Date(email.date).getDate()}&nbsp;
              {new window.Date(email.date).toLocaleString("default", {
                month: "long",
              })}
              &nbsp;
              {new window.Date(email.date).getFullYear().toString()}&nbsp;
            </Date>
          </Box>
          <Typography style={{ marginTop: "1.2rem" }}>{email.body}</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default ViewEmail;
