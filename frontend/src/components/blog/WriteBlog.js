import Container from "@mui/material/Container";
import {
  Card,
  Box,
  Grid,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { DeleteRounded, ImageRounded } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import DenseAppBar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getJwtToken, getUserId, getFullName } from "../../localStorage";
import "./styles.css";
import hostUrl from "../../constants";
import topicArnPrefix from '../../constants';

export default function WriteBlog() {
  const navigate = useNavigate();

  const fileInput = useRef(null);
  const [images, setImages] = useState([]);

  const onImageSelect = (e) => {
    if (e.target.files) {
      const files = e.target.files;
      const newImages = [];
      let lastId = images.length;

      let reader = new FileReader();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        reader.readAsDataURL(file);
        reader.onload = () => {
          newImages.push(reader.result);
          setImages((oldImages) => [...oldImages, ...newImages]);
        };
        const id = lastId + 1;
        lastId = id;
      }
    }
  };

  const onImageChange = () => {
    if (fileInput.current != null) {
      fileInput.current.click();
    }
  };

  const onDeleteImage = (url) => {
    const filteredImages = images.filter((image) => image !== url);
    setImages(filteredImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let imageArr = [];

    for await (const image of images) {
      try {
        const res = await axios({
          method: "post",
          url: hostUrl + "/image",
          data: {
            file: image,
            key: getUserId() + "_" + Date.now(),
          },
          headers: {
            Authorization: getJwtToken(),
          },
        });
        imageArr.push({ url: res.data.uploadResult.Location });
      } catch (err) {
        console.log("Error while calling POST blog API: ", err);
      }
    }

    axios({
      method: "post",
      url: hostUrl + "/sendNotification",
      data: {
        Message:
          "Hi " + getFullName() + "! You have successfully posted a new blog!",
        Subject: "Blog posted successfully!",
        TopicArn: topicArnPrefix + ":" + getUserId(),
      },
      headers: {
        Authorization: getJwtToken(),
      },
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error while calling Send Notification api: ", err);
      });

    axios({
      method: "post",
      url: hostUrl + "/postBlog",
      data: {
        title: data.get("title"),
        content: data.get("content"),
        author_id: getUserId(),
        images: imageArr,
      },
      headers: {
        Authorization: getJwtToken(),
      },
    })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log("Error while calling POST blog API: ", err);
      });
  };

  const card_1 = {
    backgroundColor: "white",
    borderRadius: "10px",
    borderWidth: 1,
    margin: "10px",
    padding: "10px",
  };

  return (
    <>
      <DenseAppBar />
      <Container component="main" maxWidth="md">
        <Card variant="outlined" style={card_1}>
          <Box
            sx={{
              marginTop: 0,
              display: "absolute",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" sx={{ texAlign: "center", flexGrow: 1 }}>
                BLOG
              </Typography>
            </Grid>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Blog Title"
                name="title"
                id="title"
                required
                sx={{ marginTop: 1, marginBottom: 2 }}
              />
              <TextField
                fullWidth
                required
                label="Content"
                name={"content"}
                id="content"
                rows={4}
                multiline
                sx={{ marginTop: 1, marginBottom: 2 }}
              />

              {images.length > 0 && (
                <Box className="images">
                  {images.map((image, index) => (
                    <div className="image-container" key={index + ""}>
                      <img
                        className="image"
                        src={image}
                        srcSet={image}
                        width="200"
                        height="200"
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "2%",
                          right: "2%",
                          backgroundColor: "lightblue",
                        }}
                        onClick={() => onDeleteImage(image)}
                      >
                        <DeleteRounded />
                      </IconButton>
                    </div>
                  ))}
                </Box>
              )}

              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Image upload */}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInput}
                  onChange={onImageSelect}
                />

                <IconButton onClick={onImageChange}>
                  <ImageRounded fontSize="medium" />
                </IconButton>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                type={"submit"}
                sx={{ bgcolor: "#2E8BC0" }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Card>
      </Container>
    </>
  );
}
