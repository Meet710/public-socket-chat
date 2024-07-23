const calculateTotalTime = async (taskActivityId) => {
    console.log("🚀 ~ calculateTotalTime ~ taskActivityId:", taskActivityId)
    try {
        // Fetch all task timings for the given task activity ID within the provided date range
        const startOfDay = moment().startOf('day').utc().toDate()
        const endOfDay = moment().endOf('day').utc().toDate();
        const timings = await TaskTiming.find({
            taskActivityId: new mongoose.Types.ObjectId(taskActivityId),
            dateAndTime: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ dateAndTime: 1 });
        console.log("🚀 ~ calculateTotalTime ~ timings:", timings)
  
        if (!timings.length) {
            return { totalSeconds: 0 };
        }
        
       

      
        
  
        let totalTime = 0;
        let lastStartTime = null;
  
        for (let i = 0; i < timings.length; i++) {
            const timing = timings[i];
  
            if (timing.status === 'ONGOING' || timing.status === 'RESUMED' || timing.status === 'OVERDUE') {
                lastStartTime = timing.dateAndTime;
            } else if ((timing.status === 'PAUSED' || timing.status === 'COMPLETED') && lastStartTime) {
                // Calculate time from last start/resume/overdue to pause/completed
                totalTime += timing.dateAndTime - lastStartTime;
                lastStartTime = null;
            }
  
            // Ensure we handle case where last entry is ONGOING/RESUMED/OVERDUE and not followed by PAUSED/COMPLETED
     
  
            // Convert total time to seconds
            
        }
        const totalSeconds = Math.floor(totalTime / 1000);
  
        console.log(totalSeconds)
    } catch (error) {
            console.error("Error calculating total time:", error);
            throw error;
        }
    }
