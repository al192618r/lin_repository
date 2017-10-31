package com.fgi.controller;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/*import com.fgi.af.util.Constant;

import com.fgi.af.util.UserContext;*/

@Controller
@RequestMapping("/")
public class DefaultController {

	static org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(DefaultController.class);
	
	/**
	 * 普通屏幕
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(HttpServletRequest request, Model model) {
		Properties pro = new Properties();
		try {
			pro.load(new InputStreamReader(DefaultController.class.getResourceAsStream("/resources/config.properties"), "UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		model.addAttribute("projectname", pro.getProperty("ProjectName"));
		model.addAttribute("enterpriserelation", pro.getProperty("EnterpriseRelation"));
		model.addAttribute("natural", pro.getProperty("Natural"));
		return "SmallIndex";
	}
}
