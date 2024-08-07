import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import ApiLoading from "../components/ApiLoading";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import discount from "../assets/discount.png";
import shipped from "../assets/shipped.png";
import india from "../assets/india.png";
import secure from "../assets/secure.png";
import { crop } from "./bookinfunction"; //pruthvij bookings
import SnackBar from "../components/SnackBar";
import MapWithStoreLocations from "./MapWithStoreLocations";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { Transition } from "react-transition-group";
import React, { useRef } from "react";

import ReviewCard from "../components/ReviewCard";

const CropDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [postReviewData, setPostReviewData] = useState("");
  const [cropDetails, setcropDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  useEffect(() => {
    async function getSingleCrop() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `https://cropify-deploy.onrender.com/api/v1/crops/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching crops");
        }

        const data = await response.json();
        const cropData = data.data.data;

        if (!cropData) {
          throw new Error("No crops found");
        }

        setcropDetails(cropData);
        setReviews(cropData.ratings);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    getSingleCrop();
  }, [params.id]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get user
  const [userData, setUserData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  let userHasReviewed;
  if (userData) {
    userHasReviewed = reviews?.some(
      (review) => review.user._id === userData._id
    );
  } else {
    userHasReviewed = false;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cropify-deploy.onrender.com/api/v1/users/user"
        );

        if (!response.ok) {
          throw new Error("Error fetching user data.");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(
        "https://cropify-deploy.onrender.com/api/v1/reviews/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review: postReviewData,
            rating: starValue,
            crop: params.id,
            user: userData._id || "", // Add the user ID here
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
        } else {
          throw new Error("Failed to submit review. Please try again.");
        }
      }

      const updatedResponse = await fetch(
        `https://cropify-deploy.onrender.com/api/v1/crops/${params.id}`
      );

      if (!updatedResponse.ok) {
        throw new Error("Error fetching updated reviews.");
      }

      const updatedData = await updatedResponse.json();
      setReviews(updatedData.data.data.ratings);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 2000);
      setOpen(false); // Close the modal after successful submission
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookEvent = async () => {
    try {
      await crop(cropDetails._id); // Call the book event function with the event ID
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  const [loginError, setLoginError] = useState(false);

  const handleBookButtonClick = () => {
    handleBookEvent(); // Call handleBookEvent when the button is clicked
  };

  const data = [
    {
      label: "Description",
      value: "html",
      desc: cropDetails.description,
    },
    {
      label: "Usage",
      value: "react",
      desc: cropDetails.usage,
    },
  ];

  const getCart = async () => {
    try {
      const response = await fetch("/api/v1/cart/mycart");

      if (!response.ok) {
        throw new Error("Error fetching cart.");
      }

      const data = await response.json();
      setCart(data.data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await fetch(`/api/v1/cart/addToCart/${params.id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error adding item to cart.");
      }

      const data = await response.json();

      if (data.status === "success") {
        setShowSuccessAlert2(true);
        setTimeout(() => setShowSuccessAlert2(false), 2000);
      }

      getCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <ApiLoading />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <div className="mt-10 flex flex-col justify-center lg:flex-row gap-16 px-3 py-2 mx-auto ">
            <div className="flex flex-col lg:w-1/5 bg-white justify-center border border-gray-300 rounded-xl">
              <img
                src={cropDetails.image}
                alt=""
                className="w-full h-3/5 aspect-square object-contain border-gray-solid"
              />
            </div>
            {/* ABOUT */}
            <div className="flex flex-col gap-5 lg:w-2/6 py-2">
              <div>
                <h1 className="text-3xl font-bold py-2">{cropDetails.name}</h1>
                <span className="font-semibold text-red-400 ">
                  {cropDetails.type}
                </span>
                <hr />
              </div>
              <div>
                <h3 className="text-2xl font-bold ">Details</h3>
                <ul className="list-disc list-inside ml-5">
                  <li>
                    <span className="font-semibold"> Type:</span>{" "}
                    {cropDetails.type}
                  </li>
                  <li>
                    <span className="font-semibold">Subtype:</span>{" "}
                    {cropDetails.subtype}
                  </li>
                </ul>
                <hr />
              </div>

              <h6 className="text-2xl font-semibold">
                Price : ₹ <span className="">{cropDetails.price}</span>{" "}
              </h6>
              <div className="flex items-center">
                <img src={shipped} alt="checkgreen" className="w-7 h-7 mr-2" />
                <h4 className="text-[1rem] text-black">
                  In stock, Ready to Ship
                </h4>
              </div>
              <div className="flex items-center">
                <img src={india} alt="checkgreen" className="w-7 h-7 mr-2" />
                <h4 className="text-[1rem] text-black">
                  Country of Origin India
                </h4>
              </div>
              <div className="flex items-center">
                <img src={secure} alt="checkgreen" className="w-7 h-7 mr-2" />
                <h4 className="text-[1rem] text-black">Secure Transactions</h4>
              </div>

              <div className="flex flex-col items-start gap-3">
                <Button
                  onClick={addToCart}
                  size="lg"
                  color="success"
                  className="w-full"
                >
                  Add to Cart
                </Button>
                <SnackBar
                  open={showSuccessAlert2}
                  message="Item added to cart successfully!"
                />
                <Button
                  onClick={handleBookButtonClick}
                  size="lg"
                  color="primary"
                  className="w-full"
                >
                  Book
                </Button>
              </div>
            </div>

            <div className="lg:w-3/6">
              <Tabs value="html">
                <TabsHeader className="bg-[#F8F9FA] border rounded-xl">
                  {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
          </div>
          {/* RATINGS */}
          <div className="mx-auto">
            <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center lg:gap-20 gap-10 px-3 py-2 mx-auto bg-[#f8f9fa]">
              <div className="flex flex-col gap-10 lg:w-2/5 bg-white px-5 py-5 border rounded-xl">
                <h1 className="text-2xl font-bold py-2 border-b">
                  Customer Reviews
                </h1>
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <ReviewCard review={review} key={index} />
                  ))
                ) : (
                  <p>No reviews available for this crop.</p>
                )}
              </div>
              {/* MODAL */}
              <div className=" lg:w-3/5 px-5 py-5 flex flex-col gap-10 bg-white border rounded-xl">
                <h1 className="text-2xl font-bold py-2 border-b">Rate Us</h1>
                <div className="relative w-full max-w-full rounded-lg border-4 border-dashed border-gray-200 p-16 text-center">
                  <Transition in={open} timeout={400}>
                    {(state) => (
                      <Modal
                        open
                        onClose={() => setOpen(false)}
                        componentsProps={{
                          backdrop: {
                            style: {
                              opacity: 0.5,
                              backgroundColor: "black",
                              transition: "opacity 0.4s",
                              opacity: state === "entered" ? 1 : 0,
                            },
                          },
                        }}
                      >
                        <ModalDialog
                          aria-labelledby="basic-modal-dialog-title"
                          aria-describedby="basic-modal-dialog-description"
                          sx={{
                            maxWidth: 500,
                            borderRadius: "md",
                            p: 3,
                            boxShadow: "lg",
                          }}
                        >
                          <DialogTitle
                            id="basic-modal-dialog-title"
                            textColor="inherit"
                          >
                            <Typography
                              component="h2"
                              level="inherit"
                              fontSize="1.25em"
                              mb="0.25em"
                            >
                              Rate Us
                            </Typography>
                          </DialogTitle>
                          <DialogContent
                            id="basic-modal-dialog-description"
                            sx={{ overflow: "auto" }}
                          >
                            <form
                              className="flex flex-col gap-4"
                              onSubmit={handleReviewSubmit}
                            >
                              <FormControl>
                                <FormLabel>Your review</FormLabel>
                                <Textarea
                                  placeholder="Type your review here..."
                                  minRows={2}
                                  value={postReviewData}
                                  onChange={(e) =>
                                    setPostReviewData(e.target.value)
                                  }
                                  required
                                />
                              </FormControl>
                              <Rating
                                name="simple-controlled"
                                value={starValue}
                                onChange={(event, newValue) => {
                                  setStarValue(newValue);
                                }}
                                required
                              />
                              <Stack
                                direction="row"
                                justifyContent="flex-end"
                                gap={1}
                              >
                                <Button
                                  variant="plain"
                                  color="neutral"
                                  onClick={() => setOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  disabled={isSubmitting}
                                  loading={isSubmitting}
                                >
                                  Submit
                                </Button>
                                {showSuccessAlert && (
                                  <SnackBar
                                    open={showSuccessAlert}
                                    message="Review submitted successfully!"
                                  />
                                )}
                              </Stack>
                              {reviewError && (
                                <ErrorMessage message={reviewError} />
                              )}
                            </form>
                          </DialogContent>
                        </ModalDialog>
                      </Modal>
                    )}
                  </Transition>

                  <button
                    className="group relative w-full h-40 flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl bg-gray-50 transition hover:bg-gray-100"
                    onClick={() => setOpen(true)}
                  >
                    <span className="text-3xl text-gray-400 transition group-hover:text-gray-600">
                      <Add />
                    </span>
                    <span className="text-xl font-medium text-gray-400 transition group-hover:text-gray-600">
                      Write a Review
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10">
            <MapWithStoreLocations cropName={cropDetails.name} />
          </div>
        </>
      )}
    </>
  );
};

export default CropDetails;
