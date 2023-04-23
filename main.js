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

const downloadFile = (evt) => {
  const file = evt.target.files[0]
  const fileSize = file.size
  const fileType = file.type
  const fileName = file.name

  const sizeInMegaBytes = toMegaBytes(fileSize)

  if (isFileValid(fileType) && isValidSize(sizeInMegaBytes)) {
    // Continue with the program
    console.log({
      eventFile: multimediaInput.files[0],
      fileName,
      fileSize,
      fileType
    })
  } else {
    throw new Error("Invalid file added. Try again.")
  }
  
}

multimediaInput.addEventListener("change", downloadFile)