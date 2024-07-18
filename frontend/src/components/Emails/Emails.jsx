import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { API_URLS } from "../../services/api.urls";
import { Box, Checkbox, List } from "@mui/material";
import Email from "../Email/Email";
import NoMails from "../common/NoMail";
import { EMPTY_TABS } from "../../constants/constants";

const Emails = () => {
  const { openDrawer } = useOutletContext();
  const { type } = useParams();
  const [selectedEmails, setSelectedEmails] = useState([
    { id: null, trash: false },
  ]);
  const [refreshScreen, setRefreshScreen] = useState(false);

  const getEmailService = useApi(API_URLS.getEmailFromType);
  const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
  const deleteEmailsService = useApi(API_URLS.deleteEmail);

  const selectedAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailService?.response?.map((email) => ({
        id: email._id,
        trash: email.trash,
      }));
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };

  const deleteSelectedEmails = (e) => {
    if (type === "trash") {
      deleteEmailsService.call(selectedEmails.map((email) => email.id));
    } else if (type === "allmail") {
      selectedEmails.forEach((email) => {
        if (email.trash) {
          deleteEmailsService.call([email.id]);
        } else {
          moveEmailsToBin.call([email.id]);
        }
      });
    } else {
      moveEmailsToBin.call(selectedEmails.map((email) => email.id));
    }
    setRefreshScreen(!refreshScreen);
  };

  useEffect(() => {
    setSelectedEmails([]);
    getEmailService.call({}, type);
  }, [type, refreshScreen]);

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: "17%", width: "calc(100% - 17%)" }
          : { width: "100%" }
      }>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1.2rem 0.8rem 0 0.8rem",
        }}>
        <Checkbox size="small" onChange={(e) => selectedAllEmails(e)} />
        <span
          className="material-symbols-outlined"
          style={{ cursor: "pointer" }}
          onClick={(e) => deleteSelectedEmails(e)}>
          delete
        </span>
      </Box>
      <List>
        {getEmailService?.response?.map((email) => (
          <Email
            key={email._id}
            email={email}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            setRefreshScreen={setRefreshScreen}
          />
        ))}
      </List>
      {getEmailService?.response?.length === 0 && (
        <NoMails message={EMPTY_TABS[type]} />
      )}
    </Box>
  );
};

export default Emails;
