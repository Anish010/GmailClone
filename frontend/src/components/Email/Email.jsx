import { Star, StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography, styled } from "@mui/material";
import React from "react";
import { routes } from "../../routes/routes";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { API_URLS } from "../../services/api.urls";

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

const Email = ({
  email,
  selectedEmails,
  setSelectedEmails,
  setRefreshScreen,
}) => {
  const navigate = useNavigate();
  const { type } = useParams();
  const toggleStarredService = useApi(API_URLS.toggleStarredEmails);

  const toggleStarredEmails = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefreshScreen((prevState) => !prevState);
  };


  const onCheckboxChange = () => {
    if (selectedEmails.some((e) => e.id === email._id)) {
      setSelectedEmails((prevState) =>
        prevState.filter((e) => e.id !== email._id)
      );
    } else {
      setSelectedEmails((prevState) => [
        ...prevState,
        { id: email._id, trash: email.trash },
      ]);
    }
  };

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.some((e) => e.id === email._id)}
        onChange={() => onCheckboxChange()}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: "0.9rem", color: "f4b400" }}
          onClick={() => toggleStarredEmails()}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: "0.9rem" }}
          onClick={() => toggleStarredEmails()}
        />
      )}

      <Box
        onClick={() => navigate(routes.view.path, { state: { email: email } })}>
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
