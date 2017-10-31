package com.fgi.axis;

import java.util.List;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;


public class AxisUtils {
	public String methodName;
	public String namespace;
	public String endpoint;
	public TypeEnum te;
	public Object[] objs;
	public List<String> paras;
	public AxisUtils(TypeEnum te,String nameSpace,String endPoint,String methodName,List<String> paras,Object ... param){
		this.te = te;
		this.methodName= methodName;
		this.namespace = nameSpace;
		this.objs = param;
		this.paras = paras;
		this.endpoint = endPoint;
	}
	public Object getCall() {
		Service service = new Service();
		Call call = null;
		try {
			call = (Call) service.createCall();
			call.setSOAPActionURI(namespace + "" + methodName);
			call.setUseSOAPAction(true);
			call.setOperationName(new QName(namespace, methodName));
			for (String obj : paras) {
				call.addParameter(new QName(namespace, obj), XMLType.XSD_STRING, ParameterMode.IN);
			}
			call.setTargetEndpointAddress(new java.net.URL(endpoint));
			if (te.ate.getQname().equals(org.apache.axis.encoding.XMLType.XSD_STRING)) {
				call.setReturnType(org.apache.axis.encoding.XMLType.XSD_STRING);
				String ret = (String) call.invoke(objs);
				return ret;
			} else {
				call.setReturnType(org.apache.axis.encoding.XMLType.XSD_SCHEMA);
				Object res = (Object) call.invoke(objs);
				return res;
			}

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return null;
		}

	}
}
