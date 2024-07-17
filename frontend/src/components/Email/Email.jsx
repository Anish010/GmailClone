import { StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography, styled } from "@mui/material";
import React from "react";
import { routes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)({
  padding: "0 0 0 0.8rem",
  background: "#F2F6FC",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  "& > div": {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    "& > p": {
      fontSize: "0.9rem",
    },
  },
});

const Indicator = styled(Typography)({
  fontSize: "0.8rem !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px",
  borderRadius: 4,
  marginRight: 6,
});

const Date = styled(Typography)({
  marginLeft: "auto",
  marginRight: "1rem",
  fontSize: "0.9rem",
  color: "#5F6368",
});

const Email = ({ email, selectedEmails, setSelectedEmails }) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Checkbox size="small" checked={selectedEmails.includes(email._id)} />
      <StarBorder fontSize="small" style={{ marginRight: "0.9rem" }} />
      <Box onClick={() => navigate(routes.view.path, {state: {email: email}})}>
        <Typography style={{ width: "18%", overflow: "hidden" }}>
          {email.name}
        </Typography>
        <Indicator>Inbox</Indicator>
        <Typography>
          {email.subject} {email.body && "-"} {email.body}
        </Typography>
        <Date>
          {new window.Date(email.date).getDate()}
          {new window.Date(email.date).toLocaleString("default", {
            month: "long",
          })}
        </Date>
      </Box>
    </Wrapper>
  );
};

export default Email;
