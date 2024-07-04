const fs = require('fs');
const path = require('path');

function calculateCoordinates(data) {
    const coordinates = [{ x: 0, y: 0 }];
    let currentAngle = 0; // Начальный угол
    let currentPoint = coordinates[0];

    data.forEach((wall) => {
 
        const lengthInCm = wall.length / 10;


        currentAngle = (currentAngle + wall.angle) % 360;


        const radianAngle = (currentAngle * Math.PI) / 180;
        const newPoint = {
            x: currentPoint.x + lengthInCm * Math.cos(radianAngle),
            y: currentPoint.y + lengthInCm * Math.sin(radianAngle),
        };

        coordinates.push(newPoint);
        currentPoint = newPoint;
    });

    return coordinates;
}

// данные
const wallData = [
    { length: 1665, angle: 0 },
    { length: 947, angle: 90 },
    { length: 557, angle: 0 },
    { length: 1300, angle: 90 },
    { length: 2225, angle: 180 },
    { length: 2239, angle: 270 },
];

const coordinates = calculateCoordinates(wallData);
console.log(coordinates);

// Вывод 
coordinates.forEach((point, index) => {
    console.log(`Точка ${index + 1} - x: ${point.x}, y: ${point.y}`);
});


const folderPath = path.join(__dirname, 'output');
const filePath = path.join(folderPath, 'coordinates.txt');

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Запись 
const dataToWrite = coordinates.map((point, index) => `Точка ${index + 1} - x: ${point.x.toFixed(2)}, y: ${point.y.toFixed(2)}`).join('\n');
fs.writeFileSync(filePath, dataToWrite);

console.log('Координаты записаны в файл:', filePath);
