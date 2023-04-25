const multimediaInput = document.getElementById("multimedia")
const VALID_FILE_TYPES = ["mp3", "mp4", "mpeg", "mpga", "m4a", "wav", "webm"]

const toMegaBytes = (sizeInBytes) => {
  const megabyte = 0.000001;
  const byte = 1

  return (sizeInBytes * megabyte) / byte
}

const isFileValid = (type) => {
  return VALID_FILE_TYPES.some(value => type.match(value))
}

const isValidSize = (sizeInMegabytes) => {
  return sizeInMegabytes <= 25;
}

const postFileToManipulate = (evt) => {
  // Sending file to backend in order
  // to be read and receive transcription
  console.log(evt)
}

const showVisualFeedback = () => {
  // TODO: Evaluate the event and 
  // update UI accordingly (either good or bad feedback)
}

const getTranscription = (arrayBuffer) => () => {
  const body = new FormData()
  body.append("binary_data", new Blob([arrayBuffer]))

  fetch("http://localhost:8080/multimedia", {
    method: "POST",
    body
  })
    .then(res => res.json())
    .then(data => console.log)
}

const downloadFile = (evt) => {
  const file = evt.target.files[0]
  const fileSize = file.size
  const fileType = file.type
  const fileName = file.name

  const sizeInMegaBytes = toMegaBytes(fileSize)

  if (isFileValid(fileType) && isValidSize(sizeInMegaBytes)) {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = getTranscription(reader.result)
    reader.onerror = showVisualFeedback
      
  } else {
    throw new Error("Invalid file added. Try again.")
  }
  
}

multimediaInput.addEventListener("change", downloadFile)